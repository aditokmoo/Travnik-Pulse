import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
const WelcomePage = lazy(() => import("./pages/WelcomePage/Page/WelcomePage"));
import TouristDataContext from "./context/TouristDataContext";
import Protect from "./components/Protect";
const TourPanel = lazy(() => import("./pages/TourPanel/TourPanel"));
import PreventInit from "./components/PreventInit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const Login = lazy(() => import("./pages/Login/Page/Login"));
import { Toaster } from "react-hot-toast";
const Admin = lazy(() => import("./pages/Admin/Page/Admin"));
const Map = lazy(() => import("./pages/Map/Map"));
const Shop = lazy(() => import("./pages/Shop/Shop"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Tour = lazy(() => import("./pages/Tour/Tour"));
import AdminContext from "./context/AdminContext";
const CalendarPage = lazy(() =>
  import("./pages/ClientCalendar/CalendarPage/CalendarPage")
);
const EditTourAdmin = lazy(() =>
  import("./pages/EditTourAdmin/Page/EditTourAdmin")
);
import ProtectAdmin from "./components/ProtectAdmin";
const CreateTourAdmin = lazy(() =>
  import("./pages/CreateTourAdmin/CreateTourAdmin")
);
const AdminCalendar = lazy(() => import("./pages/AdminCalendar/AdminCalendar"));
const AdminReviews = lazy(() => import("./pages/AdminReviews/AdminReviews"));
const AdminSingleReview = lazy(() =>
  import("./pages/AdminSingleReview/AdminSingleReview")
);
const Register = lazy(() => import("./pages/Register/Page/Register"));
const Page = lazy(() => import("./pages/AdminShops/Page/Page"));
const CreateShop = lazy(() => import("./pages/CreateShop/CreateShop"));
const Me = lazy(() => import("./pages/Me/Me"));
const EditShop = lazy(() => import("./pages/EditShop/EditShop"));
import MapContext from "./context/MapContext";
import EditPreferences from "./pages/Settings/EditPreferencesSettings/EditPreferencesSettings";
import Spinner from "./components/Spinner/Spinner";
import NotFound from "./pages/NotFound/NotFound";
import { LanguageTranslator } from "./components/LanguageTranslator";
import LanguageContext from "./context/LanguageContext";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/app" />} />
              <Route path="/app">
                <Route index element={<Navigate to="/app/dashboard" />} />
                <Route
                  path="dashboard"
                  element={
                    <TouristDataContext>
                      <LanguageContext>
                        <LanguageTranslator>
                          <Protect>
                            <TourPanel />
                          </Protect>
                        </LanguageTranslator>
                      </LanguageContext>
                    </TouristDataContext>
                  }
                />
                <Route
                  path="login"
                  element={
                    <LanguageContext>
                      <LanguageTranslator>
                        <Protect>
                          <Login />
                        </Protect>
                      </LanguageTranslator>
                    </LanguageContext>
                  }
                />
                <Route
                  path="register"
                  element={
                    <LanguageContext>
                      <LanguageTranslator>
                        <Protect>
                          <Register />
                        </Protect>
                      </LanguageTranslator>
                    </LanguageContext>
                  }
                />
                <Route path="admin">
                  <Route
                    index
                    element={
                      <LanguageContext>
                        <LanguageTranslator>
                          <AdminContext>
                            <ProtectAdmin>
                              <Admin />
                            </ProtectAdmin>
                          </AdminContext>
                        </LanguageTranslator>
                      </LanguageContext>
                    }
                  />
                  <Route
                    path="edit-tour/:tourID"
                    element={
                      <LanguageContext>
                        <LanguageTranslator>
                          <ProtectAdmin>
                            <EditTourAdmin />
                          </ProtectAdmin>
                        </LanguageTranslator>
                      </LanguageContext>
                    }
                  />
                  <Route
                    path="create-tour"
                    element={
                      <LanguageContext>
                        <LanguageTranslator>
                          <AdminContext>
                            <ProtectAdmin>
                              <CreateTourAdmin />
                            </ProtectAdmin>
                          </AdminContext>
                        </LanguageTranslator>
                      </LanguageContext>
                    }
                  />
                  <Route
                    path="calendar"
                    element={
                      <LanguageContext>
                        <LanguageTranslator>
                          <AdminContext>
                            <ProtectAdmin>
                              <AdminCalendar />
                            </ProtectAdmin>
                          </AdminContext>
                        </LanguageTranslator>
                      </LanguageContext>
                    }
                  />
                  <Route
                    path="reviews"
                    element={
                      <LanguageContext>
                        <LanguageTranslator>
                          <ProtectAdmin>
                            <AdminReviews />
                          </ProtectAdmin>
                        </LanguageTranslator>
                      </LanguageContext>
                    }
                  />
                  <Route
                    path="reviews/:reviewID"
                    element={
                      <LanguageContext>
                        <LanguageTranslator>
                          <ProtectAdmin>
                            <AdminSingleReview />
                          </ProtectAdmin>
                        </LanguageTranslator>
                      </LanguageContext>
                    }
                  />
                  <Route
                    path="shops"
                    element={
                      <LanguageContext>
                        <LanguageTranslator>
                          <ProtectAdmin>
                            <Page />
                          </ProtectAdmin>
                        </LanguageTranslator>
                      </LanguageContext>
                    }
                  />
                  <Route path="shops/create-shop" element={
                    <LanguageContext>
                      <LanguageTranslator>
                        <CreateShop />
                      </LanguageTranslator>
                    </LanguageContext>
                  } />
                  <Route path="edit-shop/:shopID" element={
                    <LanguageContext>
                      <LanguageTranslator>
                        <EditShop />
                      </LanguageTranslator>
                    </LanguageContext>
                  } />
                </Route>
                <Route
                  path="map"
                  element={
                    <LanguageContext>  
                      <LanguageTranslator>
                        <MapContext>
                          <Protect>
                            <Map />
                          </Protect>
                        </MapContext>
                      </LanguageTranslator>
                    </LanguageContext>
                  }
                />

                <Route
                  path="shop"
                  element={
                    <TouristDataContext>
                      <LanguageContext>
                        <LanguageTranslator>
                          <Shop />
                        </LanguageTranslator>
                      </LanguageContext>
                    </TouristDataContext>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <LanguageContext>
                      <LanguageTranslator>
                        <Protect>
                          <TouristDataContext>
                            <Settings />
                          </TouristDataContext>
                        </Protect>
                      </LanguageTranslator>
                    </LanguageContext>
                  }
                />
                <Route
                  path="settings/preferences"
                  element={
                    <LanguageContext>
                      <LanguageTranslator>
                        <Protect>
                          <EditPreferences />
                        </Protect>
                      </LanguageTranslator>
                    </LanguageContext>
                  }
                />
                <Route
                  path="tour/:tourID"
                  element={
                    <LanguageContext>  
                      <LanguageTranslator>
                        <MapContext>
                          <Protect>
                            <Tour />
                          </Protect>
                        </MapContext>
                      </LanguageTranslator>
                    </LanguageContext>
                  }
                />
                <Route
                  path="calendar"
                  element={
                    <LanguageContext>
                      <LanguageTranslator>
                        <Protect>
                          <CalendarPage />
                        </Protect>
                      </LanguageTranslator>
                    </LanguageContext>
                  }
                />
                <Route path="me" element={
                  <LanguageContext>
                    <LanguageTranslator>
                      <Me />
                    </LanguageTranslator>
                  </LanguageContext>
                } />
              </Route>
              <Route
                path="/welcome"
                element={
                  <TouristDataContext>
                    <LanguageContext>
                      <LanguageTranslator>
                        <PreventInit>
                          <WelcomePage />
                        </PreventInit>
                      </LanguageTranslator>
                    </LanguageContext>
                  </TouristDataContext>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <Toaster />
      </Suspense>
    </>
  );
}

export default App;
