import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertIprSchema, type Ipr, type InsertIpr } from "@shared/schema";

interface IprModalProps {
  isOpen: boolean;
  onClose: () => void;
  ipr?: Ipr | null;
}

export default function IprModal({ isOpen, onClose, ipr }: IprModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertIpr>({
    resolver: zodResolver(insertIprSchema),
    defaultValues: {
      iprId: ipr?.iprId || "",
      year: ipr?.year || new Date().getFullYear().toString(),
      grantNo: ipr?.grantNo || "",
      affiliation: ipr?.affiliation || "",
      title: ipr?.title || "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertIpr) => {
      const url = ipr ? `/api/ipr/${ipr.id}` : '/api/ipr';
      const method = ipr ? 'PUT' : 'POST';
      return await apiRequest(method, url, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ipr'] });
      toast({
        title: "Success",
        description: ipr ? "IPR updated successfully" : "IPR added successfully",
      });
      onClose();
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: ipr ? "Failed to update IPR" : "Failed to add IPR",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertIpr) => {
    mutation.mutate(data);
  };

  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString());

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {ipr ? "Edit IPR" : "Add New IPR"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="iprId">IPR ID</Label>
              <Input
                id="iprId"
                {...form.register("iprId")}
                placeholder="IPR001"
              />
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Select
                value={form.watch("year")}
                onValueChange={(value) => form.setValue("year", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="grantNo">Grant No.</Label>
              <Input
                id="grantNo"
                {...form.register("grantNo")}
                placeholder="GR2024001"
              />
            </div>
            <div>
              <Label htmlFor="affiliation">Affiliation</Label>
              <Input
                id="affiliation"
                {...form.register("affiliation")}
                placeholder="Computer Science Dept."
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="title">Title</Label>
            <Textarea
              id="title"
              {...form.register("title")}
              placeholder="Enter IPR title"
              rows={3}
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
              {mutation.isPending ? "Saving..." : ipr ? "Update IPR" : "Add IPR"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
