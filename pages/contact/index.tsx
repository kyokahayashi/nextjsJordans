import { useRouter } from "next/router";
import Link from "next/link";
import ContactForm from "../../components/contact/contactForm";
import ContactConfirmation from "../../components/contact/contactConfirmation";
import { useForm, FormProvider } from "react-hook-form";
import SignIn from "../../components/SignIn";

const Contact = () => {
  const router = useRouter();
  const isConfirm = router.query.confirm;

  const methods = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  return (
    <SignIn>
      <div className="wrapper">
        <FormProvider {...methods}>
          {isConfirm ? (
            <>
              <ContactConfirmation />
            </>
          ) : (
            <>
              <ContactForm />
            </>
          )}
        </FormProvider>
        <Link href="/">トップページ</Link>
      </div>
    </SignIn>
  );
};

export default Contact;
