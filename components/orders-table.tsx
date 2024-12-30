'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from './ui/badge';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { Order } from '@/lib/types';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type OrderProps = {orders: Order[]}

const formatter = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

export default function OrdersTable({orders}: OrderProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleClick(key: string){
    const params = new URLSearchParams(searchParams);

    if(params.get('sort') === key){
      params.set('sort', `-${key}`)
    } else if(params.get('sort') === `-${key}`){
      params.delete('sort')
    } else if(params.get('sort') === null) {
      params.set('sort', key)
    }

    replace(`${pathname}?${params.toString()}`, {scroll: false});
  }

  function getIconChevrons(key: string){
    if(searchParams.get('sort') === key){
      return <ChevronDown className="w-4"/>
    } else if (searchParams.get('sort') === `-${key}`){
      return <ChevronUp className="w-4" />
    } else {
      return <ChevronsUpDown className="w-4" />
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell cursor-pointer justify-end items-center gap-1" onClick={() => handleClick('order_date')}>
            <div className="flex items-center gap-1">
              Data
              {getIconChevrons('order_date')}
            </div>
          </TableHead>
          <TableHead className="text-right cursor-pointer flex justify-end items-center gap-1" onClick={() => handleClick('amount_in_cents')}>
            Valor
            {getIconChevrons('amount_in_cents')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
          <TableCell>
            <div className="font-medium">{order.customer_name}</div>
            <div className="hidden md:inline text-sm text-muted-foreground">
              {order.customer_email}
            </div>
          </TableCell>
          <TableCell>
            <Badge className={`text-xs`} variant="outline">
              {order.status === 'pending' ? 'Pentende' : 'Completo'}
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">{order.order_date.toString()}</TableCell>
          <TableCell className="text-right">{formatter.format(order.amount_in_cents/100)}</TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
