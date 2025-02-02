'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { Button, Dialog, DialogContent } from '@/shared/components/ui';
import { LoginForm } from './forms';

interface AuthModalProps {
  open: boolean;
  onClose: VoidFunction;
}

export const AuthModal = (props: AuthModalProps) => {
  const { open, onClose } = props;
  const [type, setType] = useState<'login' | 'register'>('login');

  function handleSwitchType() {
    setType(type === 'login' ? 'register' : 'login');
  }
  function handleClose() {
    onClose();
  }
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === 'login' ? <LoginForm onClose={() => {}} /> : <h1>REGISTER</h1>}

        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            className="gap-3 h-12 p-2 flex-1">
            <img className="w-6 h-6" src="/assets/images/logos/github.svg" />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            className="gap-3 h-12 p-2 flex-1">
            <img className="w-6 h-6" src="/assets/images/logos/google.svg" />
            Google
          </Button>
        </div>

        <Button variant="outline" onClick={handleSwitchType} type="button" className="h-12">
          {type === 'login' ? 'Регистрация' : 'Войти'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
