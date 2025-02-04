'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { Button, Dialog, DialogContent } from '@/shared/components/ui';
import { LoginForm, RegisterForm } from './forms';

interface AuthModalProps {
  open: boolean;
  onClose: VoidFunction;
}

export const AuthModal = (props: AuthModalProps) => {
  const { open, onClose } = props;
  const [type, setType] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);

  function handleSwitchType() {
    setType(type === 'login' ? 'register' : 'login');
  }

  function handleClose() {
    onClose();
  }

  function handleSignin(type: 'github' | 'google') {
    try {
      setLoading(true);
      signIn(type, {
        callbackUrl: '/',
        redirect: true,
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === 'login' ? (
          <LoginForm onClose={handleClose} loading={loading} />
        ) : (
          <RegisterForm onClose={handleClose} loading={loading} />
        )}

        <hr />
        {type === 'login' && (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                handleSignin('github');
              }}
              className="gap-3 h-12 p-2 flex-1">
              <img className="w-6 h-6" src="/assets/images/logos/github.svg" />
              GitHub
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                handleSignin('google');
              }}
              className="gap-3 h-12 p-2 flex-1">
              <img className="w-6 h-6" src="/assets/images/logos/google.svg" />
              Google
            </Button>
          </div>
        )}

        <Button
          disabled={loading}
          variant="outline"
          onClick={handleSwitchType}
          type="button"
          className="h-12">
          {type === 'login' ? 'Регистрация' : 'Вход'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
