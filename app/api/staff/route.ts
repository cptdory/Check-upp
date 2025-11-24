import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// GET — Fetch all users
export async function GET() {
  try {
    const rows = await sql`SELECT * FROM users ORDER BY id ASC`;
    return Response.json(rows);
  } catch (err) {
    console.error("GET /users error:", err);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST — Create users
export async function POST(req: Request) {
  try {
    const { name, role } = await req.json();

    await sql`
      INSERT INTO users (name)
      VALUES (${name})
    `;

    return Response.json({ success: true });
  } catch (err) {
    console.error("POST /users error:", err);
    return Response.json({ error: "Failed to create users" }, { status: 500 });
  }
}

// PUT — Update users
export async function PUT(req: Request) {
  try {
    const { id, name, role } = await req.json();

    await sql`
      UPDATE users 
      SET name = ${name}, role = ${role}
      WHERE id = ${id}
    `;

    return Response.json({ success: true });
  } catch (err) {
    console.error("PUT /users error:", err);
    return Response.json({ error: "Failed to update users" }, { status: 500 });
  }
}

// DELETE — Delete users
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await sql`
      DELETE FROM users 
      WHERE id = ${id}
    `;

    return Response.json({ success: true });
  } catch (err) {
    console.error("DELETE /users error:", err);
    return Response.json({ error: "Failed to delete users" }, { status: 500 });
  }
}
