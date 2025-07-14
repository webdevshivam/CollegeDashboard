import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertBannerSchema, type Banner, type InsertBanner } from "@shared/schema";
import FileUpload from "@/components/ui/file-upload";

interface BannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  banner?: Banner | null;
}

export default function BannerModal({ isOpen, onClose, banner }: BannerModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertBanner>({
    resolver: zodResolver(insertBannerSchema),
    defaultValues: {
      bannerId: banner?.bannerId || "",
      title: banner?.title || "",
      imageUrl: banner?.imageUrl || "",
      priority: banner?.priority || 1,
      isActive: banner?.isActive ?? true,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertBanner) => {
      const url = banner ? `/api/banners/${banner.id}` : '/api/banners';
      const method = banner ? 'PUT' : 'POST';
      return await apiRequest(method, url, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/banners'] });
      toast({
        title: "Success",
        description: banner ? "Banner updated successfully" : "Banner added successfully",
      });
      onClose();
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: banner ? "Failed to update banner" : "Failed to add banner",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBanner) => {
    mutation.mutate(data);
  };

  const handleFileUpload = (url: string) => {
    form.setValue("imageUrl", url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {banner ? "Edit Banner" : "Add New Banner"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="bannerId">Banner ID</Label>
            <Input
              id="bannerId"
              {...form.register("bannerId")}
              placeholder="BAN001"
            />
          </div>
          
          <div>
            <Label htmlFor="title">Banner Title</Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="Welcome Week 2024"
            />
          </div>
          
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={form.watch("priority")?.toString()}
              onValueChange={(value) => form.setValue("priority", parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 (Highest)</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5 (Lowest)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Banner Image</Label>
            <FileUpload
              onUpload={handleFileUpload}
              accept="image/*"
              maxSize={5 * 1024 * 1024} // 5MB
            />
            {form.watch("imageUrl") && (
              <div className="mt-2">
                <img 
                  src={form.watch("imageUrl")} 
                  alt="Banner preview"
                  className="w-32 h-20 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={form.watch("isActive")}
              onCheckedChange={(checked) => form.setValue("isActive", checked)}
            />
            <Label htmlFor="isActive">Active</Label>
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
              {mutation.isPending ? "Saving..." : banner ? "Update Banner" : "Add Banner"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
