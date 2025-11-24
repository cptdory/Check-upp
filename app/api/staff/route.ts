import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// GET — Fetch all users
export async function GET() {
  const rows = await sql`SELECT * FROM users ORDER BY id ASC`;
  return Response.json(rows);
}

// POST — Create users
export async function POST(req: Request) {
  const { name, email } = await req.json();

  await sql`INSERT INTO users (name, email) VALUES (${name}, ${email})`;

  return Response.json({ success: true });
}

// PUT — Update users
export async function PUT(req: Request) {
  const { id, name, email } = await req.json();

  await sql`UPDATE users SET name = ${name}, email = ${email} WHERE id = ${id}`;

  return Response.json({ success: true });
}

// DELETE — Delete users
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await sql`DELETE FROM users WHERE id = ${id}`;

  return Response.json({ success: true });
}
