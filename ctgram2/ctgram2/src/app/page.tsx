"use client"
import Image from "next/image";
import { UseForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner";
import Cookies from "js-cookie"

export default function Home() {
  return (
    <div id="inicial">
      <main id="box">
        <Image src="https://www.ctjunior.com.br/images/logo/logo-branca-reta-noSlogan.svg" width={300} height={120.75} alt="" className="pb-3" />
        <form className="w-full flex flex-col gap-5 items-center">
        </form>
      </main>
    </div>
  );
}
