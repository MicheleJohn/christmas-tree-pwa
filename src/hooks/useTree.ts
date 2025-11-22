'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateTreeInput, UpdateTreeInput } from '@/schemas/tree.schema'
import { toast } from 'sonner'

export function useTree() {
  const queryClient = useQueryClient()

  const tree = useQuery({
    queryKey: ['tree'],
    queryFn: async () => {
      const res = await fetch('/api/tree')
      if (!res.ok) throw new Error('Failed to fetch tree')
      return res.json()
    },
  })

  const createTree = useMutation({
    mutationFn: async (data: CreateTreeInput) => {
      const res = await fetch('/api/tree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create tree')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tree'] })
      toast.success('Tree created successfully! 🎄')
    },
    onError: () => {
      toast.error('Failed to create tree')
    },
  })

  const updateTree = useMutation({
    mutationFn: async (data: UpdateTreeInput) => {
      const res = await fetch('/api/tree', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update tree')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tree'] })
      toast.success('Tree updated! 🎄')
    },
    onError: () => {
      toast.error('Failed to update tree')
    },
  })

  return { tree, createTree, updateTree }
}
