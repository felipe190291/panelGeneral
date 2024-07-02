import Form from "@/app/ui/products/edit-form";
import Breadcrumbs from "@/app/ui/orders/breadcrumbs";
import {
  fetchCustomers,
  fetchProductById,
  fetchProducts,
} from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [dataId, dataAll] = await Promise.all([
    fetchProductById(id),
    fetchProducts(),
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/dashboard/products" },
          {
            label: "Edit Product",
            href: `/dashboard/products/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form dataAll={dataAll} dataId={dataId} />
    </main>
  );
}
