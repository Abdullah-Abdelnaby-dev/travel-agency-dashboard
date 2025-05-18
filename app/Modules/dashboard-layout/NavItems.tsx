import { Link, NavLink } from "react-router"
import { sidebarItems } from "~/constants"
import { cn } from "~/lib/utils"

const NavItems = ({handleClick}:{handleClick?: ()=> void}) => {

  const user ={
    name: 'Abdullah ',
    email: 'AbdullahAbdelnaby@gmail.com',
    imgUrl:'/public/assets/images/david.webp'
  }

  return (
    <section className="nav-items flex flex-col gap-4">
      <Link to='/dashboard' className="link-logo">
      <img src="/public/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
      <h1>Tourvisto</h1>
      </Link>

      <div className="container">
        <nav>
          {sidebarItems.map(({href,icon,label,id})=>{
            return (
             <NavLink to={href} key={id}>
              {({isActive}: {isActive:boolean})=> (
                <div className={cn('group nav-item',{
                  'bg-primary-100 !text-white': isActive,
                })} onClick={()=>handleClick}>
                  <img src={icon} alt={label}
                  className={`group-hover:brightness-0 size-0${isActive ? 'brightness-0 invert': 'text-dark-200'}`}
                  />
                  {label}
                </div>
              )}
               </NavLink>
            )
          })}
        </nav>
        <footer className="nav-footer">

          <img src={user?.imgUrl ||'/public/assets/images/david.webp' } alt={user?.name || "Abdullah "} />

          <article>


            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </article>
           
          <button onClick={()=>{
            console.log('logout')
            
          }} className="cursor-pointer">

            <img src="/public/assets/icons/logout.svg" alt="logout" className="size-6" />
          </button>
        </footer>
      </div>
      
    </section>
  )
}

export default NavItems
