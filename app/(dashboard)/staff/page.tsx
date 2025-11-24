"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// If using Sonner:
import { toast } from "sonner";

interface Staff {
  id: number;
  name: string;
  role: string;
}

export default function Page() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{ id: number | null; name: string; role: string }>({
    id: null,
    name: "",
    role: "",
  });
  const [open, setOpen] = useState(false);

  async function fetchStaff() {
    setLoading(true);
    const res = await fetch("/api/staff", { cache: "no-store" });
    const data = await res.json();
    setStaff(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchStaff();
  }, []);

  async function saveStaff() {
    const method = form.id ? "PUT" : "POST";

    const res = await fetch("/api/staff", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success(form.id ? "Staff updated successfully!" : "Staff added!");
    } else {
      toast.error("An error occurred while saving staff.");
    }

    setOpen(false);
    setForm({ id: null, name: "", role: "" });
    fetchStaff(); // refresh table
  }

  async function deleteStaff(id: number) {
    const res = await fetch(`/api/staff?id=${id}`, { method: "DELETE" });

    if (res.ok) {
      toast.success("Staff deleted.");
    } else {
      toast.error("Failed to delete staff.");
    }

    fetchStaff();
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <Button
          onClick={() => {
            setForm({ id: null, name: "", role: "" });
            setOpen(true);
          }}
        >
          Add Staff
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.id}</TableCell>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.role}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setForm(s);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => deleteStaff(s.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Staff" : "Add Staff"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <Label>Role</Label>
              <Input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={saveStaff}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
