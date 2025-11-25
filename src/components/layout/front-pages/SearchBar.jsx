import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'
import TextField from '@mui/material/TextField'

const SearchBar = props => {
  const { checked, locale } = props
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    router.push(`${locale}/search?q=${query}`)
  }

  return (
    <>
      <Slide direction='down' in={checked} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'absolute',
            top: 124,
            left: 180,
            backgroundColor: 'white',
            width: 'calc(100vw - 360px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 4,
            borderRadius: '10px'
          }}
        >
          <form onSubmit={handleSubmit} class='w-full flex items-center gap-2'>
            <TextField
              size='small'
              fullWidth
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder='search . . .'
            />
            <Button
              className={'bg-[#C1A658] px-[40px] text-[#ffffff] py-[9px] rounded-[6px]'}
              size='small'
              type='submit'
            >
              Search
            </Button>
          </form>
        </Box>
      </Slide>
    </>
  )
}

export default SearchBar
