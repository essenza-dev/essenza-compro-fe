import Button from '@mui/material/Button'

const CustomButton = ({ children, borderColor = '#757575', ...props }) => {
  return (
    <Button
      variant='outlined'
      className={`text-[#757575] border-[${borderColor}] rounded-[6px] py-[4px]`}
      fullWidth
      {...props}
    >
      {children}
    </Button>
  )
}

export default CustomButton
