
<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import type {
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table"
import {
  createColumnHelper,
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table"
import { ArrowsUpDownIcon } from "@heroicons/vue/24/outline"
import { h, ref } from "vue"
import { cn, valueUpdater } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface Payment {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
]

const columnHelper = createColumnHelper<Payment>()

const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => h(Checkbox, {
      "modelValue": table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate"),
      "onUpdate:modelValue": (value: boolean) => table.toggleAllPageRowsSelected(!!value),
      "ariaLabel": "Select all",
    }),
    cell: ({ row }) => {
      return h(Checkbox, {
        "modelValue": row.getIsSelected(),
        "onUpdate:modelValue":  (value: boolean) => row.toggleSelected(!!value),
        "ariaLabel": "Select row",
          "class": " text-left"
        
      })
    },
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("status", {
    enablePinning: true,
    header: () => h("div", { class: "text-center" }, "Status"),
    cell: ({ row }) => h("div", { class: "capitalize w-full text-center" }, row.getValue("status")),
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return h(Button, {
        variant: "ghost",
        class: "w-full hover:bg-transparent hover:text-gray-500",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      }, () => ["Email", h(ArrowsUpDownIcon, { class: "ml-2 h-4 w-4" })])
    },
    cell: ({ row }) => h("div", { class: "lowercase text-center" }, row.getValue("email")),
  }),
  columnHelper.accessor("amount", {
    header: () => h("div", { class: "text-right" }, "Amount"),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return h("div", { class: "text-right font-medium" }, formatted)
    },
  }),
  // columnHelper.display({
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original

  //     return h("div", { class: "relative" }, h(DropdownAction, {
  //       payment,
  //       onExpand: row.toggleExpanded,
  //     }))
  //   },
  // }),
]

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
    get expanded() { return expanded.value },
    
  },
})
</script>

<template>
        <div class="border flex justify-end flex-row-reverse gap-4 items-stretch py-4 px-6 mb-4 rounded-lg">
            <div class="flex gap-2 flex-col justify-start items-end">
                <p class="text-black text-xl font-normal">اشتراك سلة الحالي</p>
                <div class="flex items-center flex-row-reverse gap-2">
                    <p class="text-[#239600] bg-[#E2FFD9] rounded-full px-4 py-1 text-xs font-normal text-right">نشط</p>
                    <p class="text-sm">متبقي 05 أيام</p>
                </div>
            </div>
            <div class="rounded-lg flex-1 bg-[#FAFAFA] p-4 border-[#2AA405] border flex flex-col justify-end items-end">
                <p class="text-sm font-bold text-black">تاريخ البداية</p>
                <p class="text-xs font-normal text-[#9C9196]">2025-09-21</p>
            </div>
            <div class="rounded-lg flex-1 bg-[#FAFAFA] p-4 border-[#FC9494] border flex flex-col justify-end items-end">
                <p class="text-sm font-bold text-black">تاريخ الانتهاء</p>
                <p class="text-xs font-normal text-[#9C9196]">2025-09-21</p>
            </div>
        </div>
        <div class="border py-4 px-6 mb-4 rounded-lg">
            <Table class="[&_th]:border-0 [&_td]:border-0 [&_td]:text-center [&_th]:text-center [&_th]:bg-zinc-50  [&_th]:py-4  [&_td]:py-4">
    <TableHeader>
      <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <TableHead
          v-for="header in headerGroup.headers"
          :key="header.id"
          :data-pinned="header.column.getIsPinned()"
          :class="cn(
            { 'sticky bg-background/95': header.column.getIsPinned() },
            header.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
          )"
        >
          <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
        </TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <template v-if="table.getRowModel().rows?.length">
        <template v-for="row in table.getRowModel().rows" :key="row.id">
          <TableRow :data-state="row.getIsSelected() && 'selected'">
            <TableCell
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              :data-pinned="cell.column.getIsPinned()"
              :class="cn(
                { 'sticky bg-background/95': cell.column.getIsPinned() },
                cell.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
              )"
            >
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
      </template>

      <TableRow v-else>
        <TableCell
          :colspan="columns.length"
          class="h-24 text-center"
        >
          No results.
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
    </div>
</template>