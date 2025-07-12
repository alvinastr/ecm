import { getOrders } from '@/sanity/lib/client';
import { getCurrentSession } from '@/actions/auth';
import { formatPrice } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { Order } from '../../../sanity.types';
import Link from 'next/link';

export default async function OrdersPage() {
  const { user } = await getCurrentSession();
  
  if (!user) {
    redirect('/auth/sign-in');
  }

  const orders = await getOrders(user.id.toString());

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No orders found</div>
            <p className="text-gray-400 mb-6">You haven&apos;t placed any orders yet.</p>
            <Link 
              href="/" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: Order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const statusColors = {
    PROCESSING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    SHIPPED: 'bg-blue-100 text-blue-800 border-blue-200',
    DELIVERED: 'bg-green-100 text-green-800 border-green-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200',
  };

  const statusColor = statusColors[order.status as keyof typeof statusColors] || statusColors.PROCESSING;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Order #{order.orderNumber}
          </h3>
          <p className="text-gray-500 text-sm">
            {order.orderDate ? new Date(order.orderDate).toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }) : 'No date'}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColor}`}>
          {order.status}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Order Details</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Email: {order.customerEmail}</p>
            <p>Total: {formatPrice((order.totalPrice || 0) * 100)}</p>
            <p>Items: {order.orderItems?.length || 0} item(s)</p>
          </div>
        </div>

        {order.shippingAddress && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
            <div className="text-sm text-gray-600">
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.line1}</p>
              {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
        )}
      </div>

      {order.orderItems && order.orderItems.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Items</h4>
          <div className="space-y-2">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {order.orderItems.map((item: any, index: number) => (
              <div key={item._key || index} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.product?.title || 'Product'} × {item.quantity}
                </span>
                <span className="text-gray-900 font-medium">
                  {formatPrice((item.price || 0) * 100)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
