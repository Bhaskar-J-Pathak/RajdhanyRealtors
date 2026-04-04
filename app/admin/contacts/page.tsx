import Link from "next/link";
import { Mail, Phone, Building2, CheckCircle, Clock, MessageCircle } from "lucide-react";
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
import { ContactStatusButton } from "@/components/admin/contact-status-button";

async function getContacts() {
  return prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    include: { property: true },
  });
}

export default async function AdminContactsPage() {
  const contacts = await getContacts();

  const newCount = contacts.filter((c) => c.status === "new").length;
  const readCount = contacts.filter((c) => c.status === "read").length;
  const repliedCount = contacts.filter((c) => c.status === "replied").length;

  const statusColors = {
    new: "success",
    read: "warning",
    replied: "secondary",
  } as const;

  const statusIcons = {
    new: Clock,
    read: MessageCircle,
    replied: CheckCircle,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contact Inquiries</h1>
        <p className="text-muted-foreground">Manage customer inquiries and messages</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{newCount}</p>
              <p className="text-sm text-muted-foreground">New</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{readCount}</p>
              <p className="text-sm text-muted-foreground">Read</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{repliedCount}</p>
              <p className="text-sm text-muted-foreground">Replied</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Inquiries ({contacts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {contacts.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => {
                    const StatusIcon = statusIcons[contact.status as keyof typeof statusIcons];
                    return (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <div className="flex items-center text-sm text-muted-foreground gap-2">
                              <a
                                href={`mailto:${contact.email}`}
                                className="flex items-center hover:text-primary"
                              >
                                <Mail className="h-3 w-3 mr-1" />
                                {contact.email}
                              </a>
                            </div>
                            {contact.phone && (
                              <a
                                href={`tel:${contact.phone}`}
                                className="flex items-center text-sm text-muted-foreground hover:text-primary"
                              >
                                <Phone className="h-3 w-3 mr-1" />
                                {contact.phone}
                              </a>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="line-clamp-2 max-w-xs">{contact.message}</p>
                        </TableCell>
                        <TableCell>
                          {contact.property ? (
                            <Link
                              href={`/properties/${contact.property.id}`}
                              className="flex items-center text-primary hover:underline"
                              target="_blank"
                            >
                              <Building2 className="h-4 w-4 mr-1" />
                              {contact.property.title}
                            </Link>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              statusColors[contact.status as keyof typeof statusColors] ||
                              "secondary"
                            }
                            className="flex items-center w-fit"
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {contact.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(contact.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <ContactStatusButton
                              id={contact.id}
                              currentStatus={contact.status}
                            />
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
              <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
              <p className="text-muted-foreground">No inquiries yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Inquiries from visitors will appear here
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
