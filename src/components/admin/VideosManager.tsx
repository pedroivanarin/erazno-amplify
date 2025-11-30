import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const VideosManager = () => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    video_url: "",
    thumbnail_url: "",
    views: "0",
    duration: "",
    active: true,
  });

  const queryClient = useQueryClient();

  const { data: videos, isLoading } = useQuery({
    queryKey: ["admin-videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("featured_videos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from("featured_videos").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-videos"] });
      toast.success("Video creado correctamente");
      resetForm();
    },
    onError: () => {
      toast.error("Error al crear el video");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase.from("featured_videos").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-videos"] });
      toast.success("Video actualizado correctamente");
      resetForm();
    },
    onError: () => {
      toast.error("Error al actualizar el video");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("featured_videos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-videos"] });
      toast.success("Video eliminado correctamente");
    },
    onError: () => {
      toast.error("Error al eliminar el video");
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      video_url: "",
      thumbnail_url: "",
      views: "0",
      duration: "",
      active: true,
    });
    setEditingId(null);
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (item: any) => {
    setFormData({
      title: item.title,
      video_url: item.video_url,
      thumbnail_url: item.thumbnail_url,
      views: item.views || "0",
      duration: item.duration || "",
      active: item.active,
    });
    setEditingId(item.id);
    setOpen(true);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestionar Videos</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Video
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar" : "Nuevo"} Video</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="video_url">URL del Video</Label>
                <Input
                  id="video_url"
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thumbnail_url">URL de Miniatura</Label>
                <Input
                  id="thumbnail_url"
                  type="url"
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="views">Vistas</Label>
                  <Input
                    id="views"
                    value={formData.views}
                    onChange={(e) => setFormData({ ...formData, views: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duración (ej: 12:45)</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
                <Label htmlFor="active">Activo</Label>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingId ? "Actualizar" : "Crear"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {videos?.map((item) => (
          <Card key={item.id} className="border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail_url}
                  alt={item.title}
                  className="w-32 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {item.views} vistas • {item.duration}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.active ? "✓ Activo" : "✗ Inactivo"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideosManager;
