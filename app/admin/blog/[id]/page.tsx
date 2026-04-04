"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2, Plus, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  published: z.boolean(),
});

type BlogFormData = z.infer<typeof blogSchema>;

const categories = [
  "Market Trends",
  "Buying Tips",
  "Selling Tips",
  "Investment",
  "Home Improvement",
  "Legal & Finance",
  "News",
];

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`);
        if (!response.ok) throw new Error("Post not found");

        const post = await response.json();

        reset({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          category: post.category,
          published: post.published,
        });

        setCoverImage(post.coverImage || "");
        setTags(JSON.parse(post.tags || "[]"));
      } catch {
        toast({
          title: "Error",
          description: "Failed to load post",
          variant: "destructive",
        });
        router.push("/admin/blog");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, reset, router, toast]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "blog");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setCoverImage(data.url);
      toast({ title: "Image uploaded successfully" });
    } catch {
      toast({
        title: "Upload failed",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags((prev) => [...prev, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          coverImage,
          tags,
        }),
      });

      if (!response.ok) throw new Error("Failed to update post");

      toast({
        title: "Post Updated",
        description: "The blog post has been successfully updated.",
      });

      router.push("/admin/blog");
    } catch {
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/blog">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Blog Post</h1>
          <p className="text-muted-foreground">Update your article</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid lg:grid-cols-[1fr_350px] gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    {...register("title")}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    rows={3}
                    {...register("excerpt")}
                    className={errors.excerpt ? "border-destructive" : ""}
                  />
                  {errors.excerpt && (
                    <p className="text-sm text-destructive">{errors.excerpt.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    rows={15}
                    {...register("content")}
                    className={errors.content ? "border-destructive" : ""}
                  />
                  {errors.content && (
                    <p className="text-sm text-destructive">{errors.content.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cover Image</CardTitle>
              </CardHeader>
              <CardContent>
                {coverImage ? (
                  <div className="relative">
                    <img
                      src={coverImage}
                      alt="Cover"
                      className="w-full aspect-video object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => setCoverImage("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="cover-upload"
                      disabled={uploading}
                    />
                    <label htmlFor="cover-upload" className="cursor-pointer">
                      {uploading ? (
                        <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin" />
                      ) : (
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      )}
                      <p className="text-muted-foreground">
                        {uploading ? "Uploading..." : "Click to upload cover image"}
                      </p>
                    </label>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    {...register("author")}
                    className={errors.author ? "border-destructive" : ""}
                  />
                  {errors.author && (
                    <p className="text-sm text-destructive">{errors.author.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select onValueChange={(value) => setValue("category", value)}>
                    <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-sm"
                      >
                        {tag}
                        <button type="button" onClick={() => removeTag(index)}>
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="published"
                    {...register("published")}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="published">Published</Label>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={() => router.back()}>
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
