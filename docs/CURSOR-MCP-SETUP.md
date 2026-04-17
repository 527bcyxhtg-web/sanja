# Cursor MCP Setup — Supabase + Cloudflare

MCP (Model Context Protocol) serveri omogućuju Cursoru da direktno pristupa tvojim live servisima.
Kad je podešeno, Cursor AI može: kreirati tabele u Supabase, deploy-ati na Cloudflare Pages, upravljati
KV/D1/R2 — bez da napuštaš editor.

> **Sigurnost:** `.cursor/mcp.json` je dodan u `.gitignore` — tokeni se nikad ne commituju.

---

## 1 — Supabase token

### 1a. Personal Access Token (PAT)

1. Idi na → [supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens)
2. Klikni **Generate new token**
3. Naziv: `cursor-mcp-sanja-plush`
4. Kopiraj token (prikazuje se samo jednom)

### 1b. Project Reference

Tvoj project ref je dio Supabase URL-a:

```text
https://ABCDEFGHIJ.supabase.co
        ^^^^^^^^^^  ← ovo je project ref
```

Nađi ga u: Dashboard → Settings → General → **Reference ID**

### 1c. Upiši u config

Otvori `.cursor/mcp.json` i zamijeni:

```json
"--project-ref", "REPLACE_WITH_YOUR_PROJECT_REF"
```

sa tvojim ref-om, i:

```json
"SUPABASE_ACCESS_TOKEN": "REPLACE_WITH_YOUR_SUPABASE_PAT"
```

sa tvojim tokenом.

---

## 2 — Cloudflare API token

> **Account ID** je već popunjen automatski: `72f2faced156df27860729035b518ef2`

### 2a. Kreiraj API token

1. Idi na → [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Klikni **Create Token**
3. Odaberi template: **Edit Cloudflare Workers**
4. Pod *Account Resources* → **Include → sanja-plush account**
5. Pod *Zone Resources* → **All zones** (ili specifično za tvoju domenu)
6. Klikni **Continue to summary** → **Create Token**
7. Kopiraj token

### 2b. Upiši u config

U `.cursor/mcp.json` zamijeni:

```json
"CLOUDFLARE_API_TOKEN": "REPLACE_WITH_YOUR_CF_API_TOKEN"
```

sa tvojim tokenом.

---

## 3 — Restart Cursor

Nakon unosa tokena:

1. **Cmd+Shift+P** → `Cursor: Restart MCP Servers`
2. Ili zatvori i ponovo otvori Cursor
3. U Cursoru provjeri: **Settings → MCP** — trebaju se vidjeti `supabase` i `cloudflare` sa zelenim statusom

---

## 4 — Što možeš raditi kad je spojeno

### Supabase (u Cursor chatu)

```text
"Kreiraj products tabelu u Supabase sa kolonama: id, name, price, stock"
"Dodaj Row Level Security na products tabelu"
"Prikaži mi sve tabele u projektu"
"Napiši migration za dodavanje slug kolone"
```

### Cloudflare (u Cursor chatu)

```text
"Deploy sanja-plush na Cloudflare Pages"
"Prikaži status zadnjeg deploymenta"
"Kreiraj novi KV namespace za session storage"
"Listaj sve Pages projekte na accountu"
```

---

## Struktura fajlova

```text
~/.cursor/mcp.json          ← globalni config (za sve projekte)
.cursor/mcp.json            ← project config (gitignored)
docs/CURSOR-MCP-SETUP.md    ← ovaj fajl
```

Cloudflare account ID: `72f2faced156df27860729035b518ef2`
