import Button from '../atoms/Button';

type ButtonWithErrorProps = {
  errorMessage: string;
  onClick: () => void;
  text?: string;
};

const ButtonWithError = ({
  errorMessage,
  onClick,
  text = '확인',
}: ButtonWithErrorProps) => {
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
          {text}
        </Button>
      </div>
    </div>
  );
};

export default ButtonWithError;
