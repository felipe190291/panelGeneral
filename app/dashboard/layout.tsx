import SideNav from '@/app/ui/dashboard/sidenav';
import HydrateJoyride from '../ui/Joyride/hydrateJoyride';
;
export default function Layout({ children }: { children: React.ReactNode}) {
 
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 ">
        <SideNav />
      </div>
   <HydrateJoyride/>
    <div  className={` flex-grow p-6 md:overflow-y-auto md:p-12 changerColor`} >
        
     {children}</div>
    
    </div>
  );
}