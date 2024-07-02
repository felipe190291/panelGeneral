import Form from '@/app/ui/orders/edit-form';
import Breadcrumbs from '@/app/ui/orders/breadcrumbs';
import { fetchCustomers, fetchOrderById,  fetchProducts } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const [dataId,products,customers] = await Promise.all([
    fetchOrderById(id),
    fetchProducts(),
    fetchCustomers()
  ]);
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Orders', href: '/dashboard/orders' },
          {
            label: 'Edit Order',
            href: `/dashboard/orders/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form customers={customers} products={products} dataId={dataId} />
    </main>
  );
}