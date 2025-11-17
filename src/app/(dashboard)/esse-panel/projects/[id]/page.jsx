'use client'

import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { getProjectById, deleteProject } from '@/services/projects'
import DetailField from '@/components/DetailField'
import DetailActions from '@/components/DetailActions'

const ProjectDetailPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      getProjectById(id)
        .then(data => setProject(data))
        .finally(() => setLoading(false))
    }
  }, [id])

  const handleDelete = async () => {
    if (confirm('Delete this project?')) {
      await deleteProject(id)
      alert('Deleted successfully!')
      router.push('/esse-panel/projects')
    }
  }

  if (loading) return <p className='p-6'>Loading...</p>
  if (!project) return <p className='p-6'>Project not found</p>

  return (
    <div className='p-6'>
      <Card className='shadow'>
        <CardHeader title='Project Detail' />
        <Divider />
        <CardContent>
          <Grid container spacing={4}>
            <DetailField label='Title' value={project.title} />
            <DetailField label='Location' value={project.location} />
            <DetailField label='Slug' value={project.slug} />
            <DetailField label='Status' value={project.is_active ? 'Active' : 'Inactive'} />
            <DetailField label='Description' value={project.description} xs={12} />
            <DetailField label='Meta Title' value={project.meta_title} />
            <DetailField label='Meta Description' value={project.meta_description} xs={12} />
            <DetailField label='Meta Keywords' value={project.meta_keywords} xs={12} />
            <Grid item xs={12}>
              <Typography variant='subtitle2' className='mb-2'>
                Main Image
              </Typography>
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className='w-[240px] h-[140px] object-cover rounded border'
                />
              ) : (
                <Typography variant='body2' color='textSecondary'>
                  No image uploaded
                </Typography>
              )}
            </Grid>
            {project.gallery?.length > 0 && (
              <Grid item xs={12}>
                <Typography variant='subtitle2' className='mb-2'>
                  Gallery
                </Typography>
                <div className='flex gap-3 flex-wrap'>
                  {project.gallery.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Gallery ${i}`}
                      className='w-[120px] h-[80px] object-cover rounded border'
                    />
                  ))}
                </div>
              </Grid>
            )}
          </Grid>
        </CardContent>
        <Divider />
        <DetailActions id={id} href='projects' />
      </Card>
    </div>
  )
}

export default ProjectDetailPage
