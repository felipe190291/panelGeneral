import { CheckIcon, ClockIcon,XCircleIcon,EnvelopeIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-red-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'delivered',
          'bg-green-200 text-gray-500': status === 'on_route',
          'bg-red-500 text-white': status === 'cancelled',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'delivered' ? (
        <>
          delivered
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'on_route' ? (
        <>
          on_route
          <EnvelopeIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'cancelled' ? (
        <>
          cancelled
          <XCircleIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
