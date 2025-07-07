import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Link, redirect } from "react-router";
import { getExistingUser, loginWithGoogle, storeUserData } from "~/appwrite/auth";
import { account } from "~/appwrite/client";
export async function clientLoader(){
  try {
    const user = await  account.get();

    if(!user.$id) return redirect('/sign-in');


  } catch (e) {
    console.log('Error loading client:', e);
    // return redirect('/sign-in');
  }
}
const SignIn = () => {

  return (
    <main className="auth">
      <section className="size-full glassmorphism flex-center px-6">
        <div className="sign-in-card ">
          <header className="header flex flex-col">
            <Link to='/dashboard' className="logo">
            <figure>
              <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
            </figure>
            </Link>
            <h1 className="p-28-bold text-dark-100 mt-3">Tourvisto</h1>
          </header>

          <article>
            <h2 className="p-24-semibold text-center text-dark-100">Start Your Travel Journey</h2>
            <p className="p-18-regular text-center text-gray-100 !leading-7">Sign in with Google to manage destinations, itineraries, and user activity with ease.</p>
          </article>

          <ButtonComponent 
          type="button"
          className="button-class !h-11 !w-full  " 
          iconCss="e-search-icon"
          onClick={loginWithGoogle}
          >
            <img 
            src="/assets/icons/google.svg"
            alt="google"  
            className="size-5"
            />
            <span className="p-18-semibold text-white">Sign in with Google</span>
          </ButtonComponent>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
