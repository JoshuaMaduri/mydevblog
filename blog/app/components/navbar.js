
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export const Navbar = () => {
    
    const pathname = usePathname()

    return (
        
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <Link href="/" className="btn btn-ghost text-xl">
                    Joshua Maduri
                </Link>
            </div>
            <div className="navbar-center">
                <ul className="menu menu-horizontal lg:menu-lg md:menu-md rounded-box hidden lg:flex">
                    <li className="mx-5">
                        <Link href="/blog" className={clsx(
                            {'btn btn-active btn-primary' : pathname === "/blog"}
                        )}>
                            Blog
                        </Link>
                    </li>
                    <li className="mx-5">
                        <Link href="/takehomes" className={clsx(
                            {'btn btn-active btn-primary': pathname === "/takehomes"}
                        )}>
                            Takehomes
                        </Link>
                    </li>
                    <li className="mx-5">
                        <Link href="/projects" className={clsx(
                            {'btn btn-active btn-primary': pathname === "/projects"}
                        )}>
                            Projects
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <details className="dropdown dropdown-end">
                    <summary tabIndex={0} role="label" className="btn btn-ghost btn-circle lg:hidden swap swap-rotate">
                        <input type="checkbox" />
                        <svg
                            className="swap-off fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 512 512">
                            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                        </svg>

                        {/* close icon */}
                        <svg
                            className="swap-on fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 512 512">
                            <polygon
                            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                        </svg>
                    </summary>
                    <ul
                        tabIndex={0}
                        className="menu menu-lg dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <Link href="/">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/takehome">
                                Takehomes
                            </Link>
                        </li>
                        <li>
                            <Link href="/projects">
                                Projects
                            </Link>
                        </li>
                    </ul>
                </details>
            </div>
        </div>
        
    )
}