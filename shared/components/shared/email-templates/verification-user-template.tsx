interface VerificationUserTemplateProps {
  code: string;
}

export const VerificationUserTemplate = ({ code }: VerificationUserTemplateProps) => (
  <div>
    <h1>Подтверждение регистрации в приложении react-pizza</h1>
    <hr />
    <p>
      Код подтверждения: <h2>{code}</h2>
    </p>

    <p>
      <a href={`${process.env.APP_URL}/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
    </p>
  </div>
);
