<script setup lang="ts">
import type {
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'
import {
  createColumnHelper,
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { ArrowsUpDownIcon } from '@heroicons/vue/24/outline'
import { h, ref } from 'vue'
import { cn, valueUpdater } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import show from '@/assets/images/show.svg'
import path from '@/assets/images/Path.svg'
import filter from '@/assets/images/filter.svg'
import plus from '@/assets/images/plus.svg'

export interface Tool {
  id: string
  name: string
  type: string
  startingDate: string
  status: string
}

const data: Tool[] = [
  {
    id: 'm5gr84i9',
    name: 'اشعار كوبون خصم كلاسيك جديد',
    type: 'اااكوبونات الخصم',
    startingDate: '2022-01-01',
    status: 'نشط',
  },
  {
    id: 'm5gr84i9',
    name: 'اشعار كوبون خصم كلاسيك جديد',
    type: 'كوبونات الخصم',
    startingDate: '2022-01-01',
    status: 'نشط',
  },
  {
    id: 'm5gr84i9',
    name: 'اشعار كوبون خصم كلاسيك جديد',
    type: 'كوبونات الخصم',
    startingDate: '2022-01-01',
    status: 'نشط',
  },
  {
    id: 'm5gr84i9',
    name: 'اشعار كوبون خصم كلاسيك جديد',
    type: 'كوبونات الخصم',
    startingDate: '2022-01-01',
    status: 'نشط',
  },
  {
    id: 'm5gr84i9',
    name: 'اشعار كوبون خصم كلاسيك جديد',
    type: 'كوبونات الخصم',
    startingDate: '2022-01-01',
    status: 'نشط',
  },
  {
    id: 'm5gr84i9',
    name: 'اشعار كوبون خصم كلاسيك جديد',
    type: 'كوبونات الخصم',
    startingDate: '2022-01-01',
    status: 'نشط',
  },
  {
    id: 'm5gr84i9',
    name: 'اشعار كوبون خصم كلاسيك جديد',
    type: 'كوبونات الخصم',
    startingDate: '2022-01-01',
    status: 'نشط',
  },
  {
    id: 'm5gr84i9',
    name: 'اشعار كوبون خصم كلاسيك جديد',
    type: 'كوبونات الخصم',
    startingDate: '2022-01-01',
    status: 'نشط',
  },
  {
    id: 'm5gr84i9',
    name: 'اشعار كوبون خصم كلاسيك جديد',
    type: 'كوبونات الخصم',
    startingDate: '2022-01-01',
    status: 'نشط',
  },
]

const columnHelper = createColumnHelper<Tool>()

const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        modelValue:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:modelValue': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all',
      }),
    cell: ({ row }) => {
      return h(Checkbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: 'Select row',
        class: ' text-left',
      })
    },
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor('name', {
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          class: 'w-full hover:bg-transparent hover:text-gray-500',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['اسم العنصر', h(ArrowsUpDownIcon, { class: 'ml-2 h-4 w-4' })],
      )
    },
    cell: ({ row }) => h('div', { class: 'lowercase text-center' }, row.getValue('name')),
  }),
  columnHelper.accessor('type', {
    enablePinning: true,
    header: () => h('div', { class: 'text-center' }, 'نوع العنصر '),
    cell: ({ row }) => h('div', { class: 'capitalize w-full text-center' }, row.getValue('type')),
  }),

  columnHelper.accessor('startingDate', {
    header: () => h('div', { class: 'text-right' }, 'تاريخ البداية'),
    cell: ({ row }) => {
      return h('div', { class: 'text-right font-medium' }, row.getValue('startingDate'))
    },
  }),
  columnHelper.accessor('status', {
    header: () => h('div', { class: 'text-right' }, 'حالة النشر '),
    cell: ({ row }) => {
      return h('div', { class: 'text-right font-medium' }, row.getValue('status'))
    },
  }),
]

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

// Page size options
const pageSizeOptions = [5, 10, 20, 50, 100]
const statusOptions = ['الكل', 'نشط', 'غير نشط']
const currentPageSize = ref(10) // Default page size

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
    get expanded() {
      return expanded.value
    },
  },
  initialState: {
    pagination: {
      pageSize: currentPageSize.value,
    },
  },
})

// Function to handle page size change
const handlePageSizeChange = (size: number) => {
  currentPageSize.value = size
  table.setPageSize(size)
}

// Function to handle status change
const handleStatusChange = (status: string) => {
  if (status === 'الكل') {
    table.getColumn('status')?.setFilterValue(undefined)
  } else {
    table.getColumn('status')?.setFilterValue(status)
  }
}
</script>

<template>
  <div class="w-full">
    <div class="grid grid-cols-2 gap-2 items-center justify-between w-full py-4">
      <div class="col-span-2 lg:col-span-1 flex items-center gap-2 flex-1">
        <p
          class="text-black text-right w-fit font-almarai text-[16px] font-normal leading-[24px] tracking-[0]"
        >
          قائمةالاشعارات المثبتة
        </p>
        <Input
          class="max-w-sm"
          placeholder="ابحث عن عنصر"
          :model-value="table.getColumn('name')?.getFilterValue() as string"
          @update:model-value="table.getColumn('name')?.setFilterValue($event)"
        />
      </div>

      <div class="flex gap-2 items-center col-span-2 lg:col-span-1 lg:justify-end">
        <div class="justify-end lg:flex grid grid-cols-3 gap-2 flex-1 items-center">
          <!-- Page Size Dropdown -->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button class="bg-transparent border-none col-span-1 shadow-none" variant="outline">
                <img :src="show" alt="" />
                عرض ({{ currentPageSize }})
                <img :src="path" alt="" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                v-for="size in pageSizeOptions"
                :key="size"
                @click="handlePageSizeChange(size)"
                :class="{ 'bg-accent': size === currentPageSize }"
              >
                {{ size }}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <!-- filter Dropdown -->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button class="bg-transparent border-none col-span-1 shadow-none relative py-3 px-6 before:absolute before:right-0 before:top-0 before:w-[1px] before:h-full before:bg-[#E3E3E3] before:content-['']" variant="outline">
                <img :src="filter" alt="" />
                حالة الاشعار ({{ currentPageSize }})
                <img :src="path" alt="" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                v-for="status in statusOptions"
                :key="status"
                @click="handleStatusChange(status)"
              >
                {{ status }}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <RouterLink
            to="/tools-list"
            class="px-3 col-span-2 lg:col-span-1 py-3 flex items-center gap-2 bg-primary text-white rounded-lg shadow-sm hover:bg-primary/90 transition-colors duration-200"
          >
            <img :src="plus" alt="" />
            اضافة عنصر جديد
          </RouterLink>
          <!-- Columns Dropdown -->
          <!--
        
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button class="bg-transparent border-none shadow-none" variant="outline">
             
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
              :key="column.id"
              class="capitalize"
              :model-value="column.getIsVisible()"
              @update:model-value="(value) => {
                column.toggleVisibility(!!value)
              }"
            >
              {{ column.id }}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      -->
        </div>
      </div>
    </div>

    <div class="rounded-md">
      <Table
        class="[&_th]:border-0 [&_td]:border-0 [&_td]:text-center [&_th]:text-center [&_th]:bg-zinc-50 [&_th]:py-4 [&_td]:py-4"
      >
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :data-pinned="header.column.getIsPinned()"
              :class="
                cn(
                  { 'sticky bg-background/95': header.column.getIsPinned() },
                  header.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
                )
              "
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
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
                  :class="
                    cn(
                      { 'sticky bg-background/95': cell.column.getIsPinned() },
                      cell.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
                    )
                  "
                >
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center"> No results. </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-start space-x-2 py-4">
      <div class="space-x-2">
        <Button
          class="bg-transparent border-none shadow-none text-[#846D76] disabled:text-[#C9BAC0]"
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          السابق
        </Button>
        <Button
          v-for="page in table.getPageCount()"
          :key="page"
          @click="table.setPageIndex(page - 1)"
          :class="[
            'mx-1 px-3 py-1 rounded-md text-center shadow-none border-none ',
            table.getState().pagination.pageIndex === page - 1
              ? 'bg-primary text-white'
              : 'bg-transparent text-[#846D76] hover:bg-primary  hover:text-white',
          ]"
        >
          {{ page }}
        </Button>
        <Button
          class="bg-transparent border-none shadow-none text-[#846D76] disabled:text-[#C9BAC0]"
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          التالي
        </Button>
      </div>
    </div>
  </div>
</template>
