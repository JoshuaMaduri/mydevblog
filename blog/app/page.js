import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full mt-10 flex">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="px-5 pt-5">
          <Image 
            src="/Profile.jpeg"
            width={300}
            height={300}
            alt="Profile Pic"
            className="rounded-full"
          />
        </figure>
        <div className="card-body items-center text-center">
            <h1 className="card-title">Joshua Maduri</h1>
            <h5 className="card-title">Software Engineer</h5>

            <ul className="flex gap-5">
              <li>
                <Link href="https://www.linkedin.com/in/jamaduri-it/" className="btn btn-circle btn-outline">
                  <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                </Link>
              </li>

              <li>
                <Link href="https://twitter.com" className="btn btn-circle btn-outline">
                  <i class="fa-brands fa-twitter" aria-hidden="true"></i>
                </Link>
              </li>

              <li>
                <Link href="https://www.github.com/JoshuaMaduri" className="btn btn-circle btn-outline">
                  <i class="fa-brands fa-github" aria-hidden="true"></i>
                </Link>
              </li>

              <li>
                <Link href="https://www.upwork.com/freelancers/~01ba971cd79401ca10" className="btn btn-circle btn-outline">
                  <i class="fa-brands fa-upwork" aria-hidden="true"></i>
                </Link>
              </li>
            </ul>
        </div>
      </div>

      <div className="divider lg:divider-horizontal"></div>

      <div>
        <h2>Blog</h2>
        <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">  

        </div>
        <div className="divider"></div>
        <h2>Takeaways</h2>
        <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">  

        </div>
        <div className="divider"></div>
        <h2>Projects</h2>
        <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">  

        </div>
      </div>

    </div>
  );
}
