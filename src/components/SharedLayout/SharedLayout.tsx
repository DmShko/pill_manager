import { FC } from 'react'; 
import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const SharedLayout: FC = () => {
  return (
    <>
        <header>
            <nav>
                <NavLink to="/">
                    PM
                </NavLink>
                <ul>
                    <li>
                        <NavLink to="/pills">
                            Pills
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/prescriptions">
                            Prescriptions
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/tasks">
                            Tasks
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
        <main>
            <Suspense fallback={'..loading'}>
                <Outlet />
            </Suspense>
        </main>
        <footer>

        </footer>
    </>
  )
}

export default SharedLayout