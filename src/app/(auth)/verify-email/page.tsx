import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const VerifyEmailPage = ({ searchParams }: PageProps) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;
  return (
    <div className="container relative h-[calc(100vh-4rem)] flex flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6 h-full">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex flex-col h-full justify-center items-center space-y-1">
            <div className="relative mb-4 h-60 sm:h-80 w-full max-w-[500px]  text-muted-foreground">
              <Image src="/email-sent-2.jpg" alt="email sent" fill />
            </div>
            <h3 className="font-semibold text-2xl">Check Your Email</h3>
            {toEmail ? (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to{" "}
                <span className="text-semibold">{toEmail}</span> .
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to your email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
