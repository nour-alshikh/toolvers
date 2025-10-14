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
import { ArrowsUpDownIcon } from '@heroicons/vue/24/outline' // Import new icons
import { h, onMounted, ref } from 'vue'
import { cn, valueUpdater } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

import {
  DropdownMenu,
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

import { icons } from '@/icons'
import { useToolsStore } from '@/store/tool'
import type { InstalledTool } from '@/types'
const { editIcon, statisticsIcon, deleteIcon, copyIcon } = icons

const toolData = useToolsStore()

const allTools = ref<InstalledTool[]>([])

onMounted(async () => {
  const tools = await toolData.getInstalledTools()
  allTools.value = tools
})

const columnHelper = createColumnHelper<InstalledTool>()

const columns = [
  columnHelper.accessor('name', {
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          class: 'w-full hover:bg-transparent text-base font-bold hover:text-gray-500',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['اسم العنصر', h(ArrowsUpDownIcon, { class: 'ml-2 h-4 w-4' })],
      )
    },
    cell: ({ row }) => h('div', { class: 'lowercase text-center' }, row.getValue('name')),
  }),
  columnHelper.accessor((row) => row.tool.type, {
    id: 'tool_type',
    enablePinning: true,
    header: () => h('div', { class: 'text-center' }, 'نوع العنصر '),
    cell: ({ row }) =>
      h('div', { class: 'capitalize w-full text-center' }, row.getValue('tool_type')),
  }),

  columnHelper.accessor('created_at', {
    header: () => h('div', { class: 'text-right' }, 'تاريخ البداية'),
    cell: ({ row }) => {
      const fullDate: string = row.getValue('created_at')
      // نأخذ فقط الجزء الأول قبل حرف T
      const dateOnly = fullDate?.split('T')[0] || '-'
      return h('div', { class: 'text-center' }, dateOnly)
    },
  }),
  columnHelper.accessor((row) => row.active, {
    id: 'active',
    header: () => h('div', { class: 'text-right' }, 'حالة النشر'),
    cell: ({ row }) => {
      const currentStatus = row.original.active === 1

      const handleToggle = async (checked: boolean) => {
        const previousStatus = row.original.active
        const newStatus = checked ? 1 : 0

        row.original.active = newStatus

        allTools.value = [...allTools.value]

        try {
          await toolData.toggleToolStatus(row?.original?.id)
        } catch (error) {
          row.original.active = previousStatus
          allTools.value = [...allTools.value]
        }
      }

      return h('div', { class: '' }, [
        h(Switch, {
          modelValue: currentStatus,
          'onUpdate:modelValue': handleToggle,
        }),
      ])
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: () => h('div', { class: 'text-center' }, 'الإجراءات'),
    cell: ({ row }) => {
      const handleAction = (action: string) => {
        console.log(`${action} action triggered for row ID: ${row.original.id}`)
      }

      return h('div', { class: 'flex justify-center space-x-2 space-x-reverse' }, [
        // Edit Button
        h(
          Button,
          {
            variant: 'outline',
            size: 'icon',
            class: 'p-1 h-8 w-8 bg-primary/20 hover:bg-primary/30 border-none ',
            title: 'تعديل',
            onClick: () => handleAction('Edit'),
          },
          () => h('img', { src: editIcon, alt: 'Edit', class: 'h-4 w-4' }),
        ),

        // Copy Button
        h(
          Button,
          {
            variant: 'outline',
            size: 'icon',
            class: 'p-1 h-8 w-8 bg-green-500/20 hover:bg-green-500/30 border-none ',
            title: 'نسخ',
            onClick: () => handleAction('Copy'),
          },
          () => h('img', { src: copyIcon, alt: 'Copy', class: 'h-4 w-4' }),
        ),

        // Statistics Button
        h(
          Button,
          {
            variant: 'outline',
            size: 'icon',
            class: 'p-1 h-8 w-8 bg-yellow-500/20 hover:bg-yellow-500/30 border-none ',
            title: 'الإحصائيات',
            onClick: () => handleAction('Statistics'),
          },
          () => h('img', { src: statisticsIcon, alt: 'Statistics', class: 'h-4 w-4' }),
        ),
        // Delete Button
        h(
          Button,
          {
            variant: 'outline',
            size: 'icon',
            class: 'p-1 h-8 w-8 bg-red-500/20 hover:bg-red-500/30 border-none ',
            title: 'حذف',
            onClick: () => handleAction('Delete'),
          },
          () => h('img', { src: deleteIcon, alt: 'Delete', class: 'h-4 w-4' }),
        ),
      ])
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
  data: allTools,
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
          class="text-foreground text-right w-fit font-almarai text-[16px] font-normal leading-[24px] tracking-[0]"
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
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button class="bg-transparent border-none col-span-1 shadow-none" variant="outline">
                <img :src="icons.show" alt="" />
                عرض ({{ currentPageSize }})
                <img :src="icons.path" alt="" />
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
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                class="bg-transparent border-none col-span-1 shadow-none relative py-3 px-6 before:absolute before:right-0 before:top-0 before:w-[1px] before:h-full before:bg-[#E3E3E3] before:content-['']"
                variant="outline"
              >
                <img :src="icons.filter" alt="" />
                حالة الاشعار ({{ currentPageSize }})
                <img :src="icons.path" alt="" />
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
            <img :src="icons.plus" alt="" />
            اضافة عنصر جديد
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="rounded-md">
      <Table
        class="[&_th]:border-0 [&_td]:border-0 [&_td]:text-center [&_th]:text-base [&_th]:font-bold [&_th]:text-center [&_th]:bg-background [&_th]:py-4 [&_td]:py-4"
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
          :class="
            [
              'mx-1 px-3 py-1 rounded-md text-center shadow-none border-none',
              table.getState().pagination.pageIndex === page - 1
                ? 'bg-primary text-white'
                : 'bg-transparent text-[#846D76] hover:bg-primary hover:text-white',
            ].join(' ')
          "
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
