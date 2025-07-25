// import package
import express from "express";
import multer from "multer";
import hbs from "hbs";
import mime from "mime-types";
import pg from "pg";
import path from "path";
import * as fs from "fs/promises";
import { fileURLToPath } from "url";

// inisiasi db
const db = new pg.Pool({
  user: `jeremy`,
  password: `123`,
  host: `localhost`,
  port: 5432,
  database: `dumb`,
  max: 1,
});

// inisialisasi express
const app = express();
const port = 3000;
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, `./src/assets/uploads`),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = mime.extension(file.mimetype);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});
const upload = multer({ storage });

// inisialisasi logika hbs
hbs.registerHelper("json", (context) => JSON.stringify(context, null, 2));
hbs.registerHelper("not", (value) => !value);
hbs.registerHelper(
  "includes",
  (arr, val) => Array.isArray(arr) && arr.includes(val)
);
hbs.registerHelper("isEmpty", (val) => {
  if (Array.isArray(val)) return val.length === 0;
  if (typeof val === "string") return val.trim() === "";
  if (val == null) return true;
  if (typeof val === "object") return Object.keys(val).length === 0;
  return false;
}); //  <pre>{{{json this.no}}}</pre>

// inisialisasi hbs
app.set(`view engine`, `hbs`); // pakai Handlebars engine
app.set(`views`, `./src/views`); // lokasi folder views
app.use(`/assets`, express.static(`./src/assets`)); // path untuk file statis
app.use(express.urlencoded({ extended: false })); // baca data dari form POST

// route render
app.get(`/`, home);
app.get(`/edit/:id`, edit);

// route handle data
app.post(`/`, upload.single(`img`), handleHome);
app.post(`/edit/:id`, upload.single(`img`), handleEdit);
app.post(`/delete/:id`, handleDelete);

// jalanin server
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);

// get (async)
async function home(req, res) {
  try {
    const techSpan = {
      js: {
        name: `JavaScript`,
        icon: `fa-square-js`,
      },
      react: {
        name: `React JS`,
        icon: `fa-react`,
      },
      php: {
        name: `PHP`,
        icon: `fa-php`,
      },
      laravel: {
        name: `Laravel`,
        icon: `fa-laravel`,
      },
    };
    const { rows } = await db.query(
      `SELECT no, name_project, date_start, date_end, description, technologies, image_filename FROM public.project ORDER BY no ASC`
    );
    const sanitizeRows = rows.map((row) => {
      const {
        no,
        name_project,
        date_start,
        date_end,
        description,
        technologies,
        image_filename,
      } = row;
      const month =
        (date_end.getFullYear() - date_start.getFullYear()) * 12 +
        (date_end.getMonth() - date_start.getMonth());
      const techUpd = technologies
        .split(",")
        .map((techno) => techSpan[techno.toLowerCase()].icon);

      return {
        no,
        name_project,
        date_start,
        date_end,
        month,
        description,
        techUpd,
        image_filename,
      };
    });
    console.log(rows.length);
    if (rows.length === 0)
      await db.query(`ALTER SEQUENCE project_no_seq RESTART WITH 1;`);
    res.render(`index`, { sanitizeRows });
  } catch (err) {
    console.log(`ErrorGET_home: ${err}`);
  }
}

// get (async)
async function edit(req, res) {
  try {
    const { id } = req.params;
    const [
      {
        name_project,
        date_start,
        date_end,
        description,
        technologies,
        image_filename,
      },
    ] = (
      await db.query(
        `SELECT name_project, date_start, date_end, description, technologies, image_filename FROM project WHERE no = $1;`,
        [id]
      )
    ).rows;
    const row = {
      id,
      name_project,
      start: new Date(date_start).toISOString().split(`T`)[0],
      end: new Date(date_end).toISOString().split(`T`)[0],
      description,
      tech: technologies.split(",").map((t) => t.trim()),
      image_filename,
    };
    res.render(`index`, { row });
  } catch (err) {
    console.log(`ErrorGET_edit: ${err}`);
  }
}

// post (async)
async function handleHome(req, res) {
  try {
    const { filename } = req.file;
    const { name, start, end, desc, tech } = req.body;
    const checkedTechs = Array.isArray(tech) ? tech.join() : tech || ``;
    await db.query(
      `INSERT INTO public.project (name_project, date_start, date_end, description, technologies, image_filename) 
        VALUES ($1, $2, $3, $4, $5, $6 );`,
      [name, start, end, desc, checkedTechs, filename]
    );
    await db.query(
      `SELECT setval('project_no_seq', (SELECT MAX(no) FROM project));`
    );
  } catch (err) {
    console.log(`ErrorPOST_home: ${err}`);
  }
  res.redirect(`/`);
}

// post (async)
async function handleEdit(req, res) {
  try {
    let filename;
    const { id } = req.params;
    const { name, start, end, desc, tech } = req.body;
    const checkedTechs = Array.isArray(tech) ? tech.join() : tech || ``;
    const [{ image_filename }] = (
      await db.query(
        `SELECT no, image_filename FROM public.project WHERE no = $1`,
        [id]
      )
    ).rows;
    req.file ? (filename = req.file.filename) : (filename = image_filename);

    await db.query(
      `UPDATE public.project SET
            name_project = $1,
            date_start = $2,
            date_end = $3,
            description = $4,
            technologies = $5,
            image_filename = $6
          WHERE no = $7;`,
      [name, start, end, desc, checkedTechs, filename, id]
    );
  } catch (err) {
    console.log(`ErrorPOST_edit: ${err}`);
  }
  res.redirect(`/`);
}

async function handleDelete(req, res) {
  try {
    const { id } = req.params;
    const [{ image_filename }] = (
      await db.query(
        `SELECT image_filename FROM public.project WHERE no = $1`,
        [id]
      )
    ).rows;
    await db.query(`DELETE FROM public.project WHERE no = $1;`, [id]);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const imagePath = path.join(
      __dirname,
      "src",
      "assets",
      "uploads",
      image_filename
    );
    await fs.unlink(imagePath);
  } catch (err) {
    console.log(`ErrorPOST_delete: ${err}`);
  }
  res.redirect(`/`);
}
