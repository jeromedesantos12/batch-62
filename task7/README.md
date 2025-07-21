# 🛡️ RPG Guild & Hero Management — PostgreSQL Edition

Selamat datang di dunia data fantasi! 🌈  
Proyek ini menyajikan struktur database sederhana untuk mengelola **guilds** dan **heroes** dalam semesta RPG. Cocok untuk belajar relational database dan foreign key dengan nuansa cerita! 📦⚔️

---

## 🔍 Struktur Database

Terdapat 2 tabel utama dalam schema `rpg`:

### 🏰 `guilds`

- `guild_id`: auto-increment (SERIAL), primary key
- `guild_name`: nama guild
- `motto`: semboyan unik masing-masing guild

### 🧙 `heroes`

- `hero_id`: auto-increment (SERIAL), primary key
- `hero_name`: nama pahlawan
- `class`: kelas/role karakter
- `guild_id`: foreign key ke `rpg.guilds`

---

## 🧪 Contoh Data

```sql
-- Tabel guilds
INSERT INTO rpg.guilds (guild_name, motto)
VALUES
  ('Shadow Fang', 'Strike from the shadows'),
  ('Solar Legion', 'Bravery burns bright'),
  ('Emerald Order', 'Wisdom guides the blade');

-- Tabel heroes
INSERT INTO rpg.heroes (hero_name, class, guild_id)
VALUES
  ('Tommy', 'Paladin', 2),
  ('Jeremy', 'Assassin', 1),
  ('Liora', 'Mage', 3),
  ('Thorne', 'Warrior', 1);
```

## 🚀 Cara Menjalankan

```sql
CREATE SCHEMA rpg;
```

```sql
-- Tabel guilds
CREATE TABLE rpg.guilds (
    guild_id SERIAL PRIMARY KEY,
    guild_name VARCHAR(100) NOT NULL,
    motto TEXT
);

-- Tabel heroes
CREATE TABLE rpg.heroes (
    hero_id SERIAL PRIMARY KEY,
    hero_name VARCHAR(100) NOT NULL,
    class VARCHAR(50),
    guild_id INTEGER,
    FOREIGN KEY (guild_id) REFERENCES rpg.guilds(guild_id)
);

```

## 💡 Tujuan Proyek

Proyek ini dibuat untuk:

- Latihan desain relational database 👨‍🏫
- Eksperimen join, foreign key, dan schema PostgreSQL
- Menjadi fondasi game RPG berbasis data atau API

```bash
⠀⠀⠀⠀⠀⠀⢀⣤⣶⣶⣖⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣾⡟⣉⣽⣿⢿⡿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢠⣿⣿⣿⡗⠋⠙⡿⣷⢌⣿⣿⠀⠀⠀⠀⠀⠀⠀
⣷⣄⣀⣿⣿⣿⣿⣷⣦⣤⣾⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀
⠈⠙⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠀⢀⠀⠀⠀⠀
⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠻⠿⠿⠋⠀⠀⠀⠀
⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⡄
⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⢀⡾⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣷⣶⣴⣾⠏⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠛⠛⠋⠁⠀⠀⠀
```

#### Made with curiosity and magic by Jeremy 🧙✨ Powered by PostgreSQL
