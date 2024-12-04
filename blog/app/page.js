import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-full flex justify-evenly items-center mt-10">
      <div className="card bg-base-100 lg:w-128 shadow-xl glass gap-3">
        <figure className="px-5 pt-5">
          <Image 
            src="/Profile.jpeg"
            width={300}
            height={300}
            alt="Profile Pic"
            className="rounded-full shadow-xl"
          />
        </figure>
        <div className="card-body items-center text-center gap-10">
            <h1 className="card-title">Joshua Maduri</h1>
            <h5 className="card-title">Software Engineer</h5>

            <ul className="flex gap-5">
              <li>
                <Link href="https://www.linkedin.com/in/jamaduri-it/" className="btn btn-circle btn-outline">
                  <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                </Link>
              </li>

              <li>
                <Link href="https://twitter.com" className="btn btn-circle btn-outline">
                  <i className="fa-brands fa-twitter" aria-hidden="true"></i>
                </Link>
              </li>

              <li>
                <Link href="https://www.github.com/JoshuaMaduri" className="btn btn-circle btn-outline">
                  <i className="fa-brands fa-github" aria-hidden="true"></i>
                </Link>
              </li>

              <li>
                <Link href="https://www.upwork.com/freelancers/~01ba971cd79401ca10" className="btn btn-circle btn-outline">
                  <i className="fa-brands fa-upwork" aria-hidden="true"></i>
                </Link>
              </li>
            </ul>
            <div className="stats stats-vertical lg:stats-horizontal shadow">
              <div className="stat">
                <div className="stat-title">Commits</div>
                <div className="stat-value">31K</div>
                <div className="stat-desc">Jan 1st - Feb 1st</div>
              </div>

              <div className="stat">
                <div className="stat-title">Repositories</div>
                <div className="stat-value">4,200</div>
                <div className="stat-desc">↗︎ 400 (22%)</div>
              </div>

              <div className="stat">
                <div className="stat-title">Projects Involved</div>
                <div className="stat-value">1,200</div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
              </div>
            </div>
        </div>
      </div>

      <div className="'">
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
