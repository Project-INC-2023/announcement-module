// import { signIn, signOut } from "next-auth/react"

// import { getServerAuthSession } from "@/server/auth"


// // eslint-disable-next-line react/function-component-definition
// export default async function Component(){
//   const { user } = (await getServerAuthSession())!;
//   if (user) {
//     return (
//       <>
//         Signed in as {user.email} <br />
//         <button type="button" onClick={() => signOut()}>Sign out</button>
//       </>
//     )
//   }
//   return (
//     <>
//       Not signed in <br />
//       <button type="button" onClick={() => signIn()}>Sign in</button>
//     </>
//   )