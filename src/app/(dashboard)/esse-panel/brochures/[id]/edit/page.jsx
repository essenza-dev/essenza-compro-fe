'use client'

import { useRouter } from 'next/router'

import BrochuresForm from '@/components/dashboards/brochures/Form'
import { handleApiResponse } from '@/utils/handleApiResponse'
import { getBrochureById } from '@/services/brochures'

const BrochuresEditPage = () => {
  const [data, setData] = useState({})
  const router = useRouter()
  const { id } = router.query
  const fetchDataDetail = async(id) = {
    await handleApiResponse(() => getBrochureById(id), {
      success: msg => success(msg),
      error: msg => error(msg),
      onSuccess: () =>
        setTimeout(() => {
          router.push('/esse-panel/banners')
        }, 2000),
      onError: () => {}
    })
  }

  return <BrochuresForm isEdit={true} initialData={data} />
}

export default BrochuresEditPage
