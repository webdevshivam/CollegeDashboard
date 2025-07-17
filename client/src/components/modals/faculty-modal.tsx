import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertFacultySchema, type Faculty, type InsertFaculty } from "@shared/schema";
import { useEffect } from "react";

interface FacultyModalProps {
  isOpen: boolean;
  onClose: () => void;
  faculty?: Faculty | null;
}

export default function FacultyModal({ isOpen, onClose, faculty }: FacultyModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertFaculty>({
    resolver: zodResolver(insertFacultySchema),
    defaultValues: {
      facultyId: "",
      name: "",
      department: "Computer Science",
      designation: "Professor",
      gender: "male",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (faculty) {
      form.reset({
        facultyId: faculty.facultyId,
        name: faculty.name,
        department: faculty.department,
        designation: faculty.designation,
        gender: faculty.gender,
      });
    } else {
      form.reset();
    }
  }, [faculty, form]);

  const mutation = useMutation({
    mutationFn: async (data: InsertFaculty) => {
      const formData = new FormData();
      formData.append("facultyId", data.facultyId);
      formData.append("name", data.name);
      formData.append("department", data.department);
      formData.append("designation", data.designation);
      formData.append("gender", data.gender);
      if ((data as any).image instanceof File) {
        formData.append("image", (data as any).image);
      }

      const id = faculty ? faculty._id?.toString() : "";
      const method = faculty ? "PUT" : "POST";
      const url = faculty ? `/api/faculty/${id}` : "/api/faculty";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.message || "Failed to submit");
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/faculty"] });
      toast({
        title: "Success",
        description: faculty ? "Faculty updated successfully" : "Faculty added successfully",
      });
      onClose();
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add/update faculty",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertFaculty) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{faculty ? "Edit Faculty" : "Add New Faculty"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="facultyId">Faculty ID</Label>
              <Input id="facultyId" {...form.register("facultyId")} placeholder="FAC001" />
            </div>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...form.register("name")} placeholder="Dr. John Doe" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department">Department</Label>
              <Select
                value={form.watch("department")}
                onValueChange={(value) => form.setValue("department", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="designation">Designation</Label>
              <Select
                value={form.watch("designation")}
                onValueChange={(value) => form.setValue("designation", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professor">Professor</SelectItem>
                  <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                  <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                  <SelectItem value="Lecturer">Lecturer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Gender</Label>
            <RadioGroup
              value={form.watch("gender")}
              onValueChange={(value) => form.setValue("gender", value)}
              className="flex space-x-6 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input
              type="file"
              accept="image/*"
              {...form.register("image")}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="bg-primary-900 hover:bg-primary-800"
            >
              {mutation.isPending
                ? "Saving..."
                : faculty
                  ? "Update Faculty"
                  : "Add Faculty"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
