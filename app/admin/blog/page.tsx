import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, Globe, GlobeLock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import { DeleteBlogButton } from "@/components/admin/delete-blog-button";

async function getBlogPosts() {
  return prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Post
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {post.coverImage && (
                            <img
                              src={post.coverImage}
                              alt=""
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <div>
                            <p className="font-medium">{post.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{post.category}</Badge>
                      </TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>
                        {post.published ? (
                          <span className="flex items-center text-green-600">
                            <Globe className="h-4 w-4 mr-1" />
                            Published
                          </span>
                        ) : (
                          <span className="flex items-center text-muted-foreground">
                            <GlobeLock className="h-4 w-4 mr-1" />
                            Draft
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          {post.published && (
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/blog/${post.slug}`} target="_blank">
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/admin/blog/${post.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DeleteBlogButton id={post.id} title={post.title} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No blog posts yet</p>
              <Button asChild>
                <Link href="/admin/blog/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Write Your First Post
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
