import Link from "next/link";
import { Building2, FileText, MessageSquare, TrendingUp, Eye, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { formatPrice } from "@/lib/utils";

async function getDashboardStats() {
  const [
    totalProperties,
    featuredProperties,
    availableProperties,
    totalBlogPosts,
    publishedPosts,
    totalContacts,
    newContacts,
    recentProperties,
    recentContacts,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { featured: true } }),
    prisma.property.count({ where: { status: "available" } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.contact.count(),
    prisma.contact.count({ where: { status: "new" } }),
    prisma.property.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.contact.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { property: true },
    }),
  ]);

  return {
    totalProperties,
    featuredProperties,
    availableProperties,
    totalBlogPosts,
    publishedPosts,
    totalContacts,
    newContacts,
    recentProperties,
    recentContacts,
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: "Total Properties",
      value: stats.totalProperties,
      subtext: `${stats.availableProperties} available, ${stats.featuredProperties} featured`,
      icon: Building2,
      href: "/admin/properties",
    },
    {
      title: "Blog Posts",
      value: stats.totalBlogPosts,
      subtext: `${stats.publishedPosts} published`,
      icon: FileText,
      href: "/admin/blog",
    },
    {
      title: "Contact Inquiries",
      value: stats.totalContacts,
      subtext: `${stats.newContacts} new`,
      icon: MessageSquare,
      href: "/admin/contacts",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the admin panel</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/properties/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/blog/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Blog Post
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Properties */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Properties</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/properties">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {stats.recentProperties.length > 0 ? (
              <div className="space-y-4">
                {stats.recentProperties.map((property) => (
                  <div
                    key={property.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{property.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {property.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        {formatPrice(property.price)}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {property.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No properties yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Contacts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Inquiries</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/contacts">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {stats.recentContacts.length > 0 ? (
              <div className="space-y-4">
                {stats.recentContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.email}
                      </p>
                      {contact.property && (
                        <p className="text-xs text-primary mt-1">
                          Re: {contact.property.title}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          contact.status === "new"
                            ? "bg-green-100 text-green-800"
                            : contact.status === "read"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {contact.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No inquiries yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col" asChild>
              <Link href="/admin/properties/new">
                <Plus className="h-6 w-6 mb-2" />
                <span>New Property</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col" asChild>
              <Link href="/admin/blog/new">
                <FileText className="h-6 w-6 mb-2" />
                <span>New Blog Post</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col" asChild>
              <Link href="/admin/contacts">
                <MessageSquare className="h-6 w-6 mb-2" />
                <span>View Contacts</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col" asChild>
              <Link href="/" target="_blank">
                <Eye className="h-6 w-6 mb-2" />
                <span>View Site</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
