import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/orders/breadcrumbs';
import { fetchCustomers, fetchCustomerById } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [dataId, dataAll] = await Promise.all([
    fetchCustomerById(id),
    fetchCustomers(),
  ]);
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Edit Product',
            href: `/dashboard/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form dataAll={dataAll} dataId={dataId} />
    </main>
  );
}