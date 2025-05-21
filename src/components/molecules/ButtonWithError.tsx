import Button from '../atoms/Button';

type ButtonWithErrorProps = {
  errorMessage: string;
  onClick: () => void;
};

const ButtonWithError = ({ errorMessage, onClick }: ButtonWithErrorProps) => {
  return (
    <div className='fixed bottom-[40px] left-0 right-0 max-w-[var(--device-width)] mx-auto '>
      <div className='w-[90%] mx-auto'>
        <p className='text-warning text-sm font-medium text-center mb-2'>
          {errorMessage}
        </p>
        <Button
          variant='primary'
          fullWidth
          disabled={errorMessage !== ''}
          type='submit'
          onClick={onClick}
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default ButtonWithError;
