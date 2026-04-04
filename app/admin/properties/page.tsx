import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, Star } from "lucide-react";
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
import { formatPrice, parseJSON } from "@/lib/utils";
import { DeletePropertyButton } from "@/components/admin/delete-property-button";

async function getProperties() {
  return prisma.property.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminPropertiesPage() {
  const properties = await getProperties();

  const statusColors = {
    available: "success",
    pending: "warning",
    sold: "destructive",
  } as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Properties</h1>
          <p className="text-muted-foreground">Manage your property listings</p>
        </div>
        <Button asChild>
          <Link href="/admin/properties/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Properties ({properties.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {properties.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((property) => {
                    const images = parseJSON<string[]>(property.images, []);
                    return (
                      <TableRow key={property.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {images[0] && (
                              <img
                                src={images[0]}
                                alt=""
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <div>
                              <p className="font-medium">{property.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {property.location}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">
                          {property.propertyType}
                        </TableCell>
                        <TableCell>{formatPrice(property.price)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              statusColors[
                                property.status as keyof typeof statusColors
                              ] || "secondary"
                            }
                          >
                            {property.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {property.featured && (
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(property.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/properties/${property.id}`} target="_blank">
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/admin/properties/${property.id}`}>
                                <Pencil className="h-4 w-4" />
                              </Link>
                            </Button>
                            <DeletePropertyButton id={property.id} title={property.title} />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No properties yet</p>
              <Button asChild>
                <Link href="/admin/properties/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Property
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
