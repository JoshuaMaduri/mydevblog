import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full mt-10 flex">
      <div className="card bg-base-100 w-96 shadow-xl glass">
        <figure className="px-5 pt-5">
          <Image 
            src="/Profile.jpeg"
            width={300}
            height={300}
            alt="Profile Pic"
            className="rounded-full shadow-xl "
          />
        </figure>
        <div className="card-body items-center text-center">
            <ul className="flex">
              <li>
                <Link href="https://www.linkedin.com/in/jamaduri-it/" className="btn btn-circle btn-outline mx-2">
                  <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                </Link>
              </li>

              <li>
                <Link href="https://twitter.com" className="btn btn-circle btn-outline mx-2">
                  <i class="fa-brands fa-twitter" aria-hidden="true"></i>
                </Link>
              </li>

              <li>
                <Link href="https://www.github.com/JoshuaMaduri" className="btn btn-circle btn-outline mx-2">
                  <i class="fa-brands fa-github" aria-hidden="true"></i>
                </Link>
              </li>

              <li>
                <Link href="https://www.upwork.com/freelancers/~01ba971cd79401ca10" className="btn btn-circle btn-outline mx-2">
                  <i class="fa-brands fa-upwork" aria-hidden="true"></i>
                </Link>
              </li>
            </ul>
        </div>
      </div>
      <div className="divider lg:divider-horizontal"></div>
      <div>

      </div>
    </div>
  );
}
