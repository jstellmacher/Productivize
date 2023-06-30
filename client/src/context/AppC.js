import React, { createContext, useEffect, useState, useContext } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [location, setLocation] = useState(null);

  const addPage = async (page) => {
    try {
      const response = await fetch("/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(page),
      });

      if (response.ok) {
        const newPage = await response.json();
        setUser((user) => ({ ...user, pages: [...user.pages, newPage] }));
      } else {
        console.error("Failed to add page:", response);
      }
    } catch (error) {
      console.error("Error during page addition:", error);
    }
  };

  const removePage = async (id) => {
    try {
      const response = await fetch(`/pages/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUser((user) => ({
          ...user,
          pages: user.pages.filter((page) => page.id !== id),
        }));
      } else {
        console.error("Failed to delete page:", response);
      }
    } catch (error) {
      console.error("Error during page deletion:", error);
    }
  };

  const editPageTitle = async (pageId, newTitle) => {
    try {
      const response = await fetch(`/pages/${pageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (response.ok) {
        setUser((user) => ({
          ...user,
          pages: user.pages.map((page) => {
            if (page.id === pageId) {
              return { ...page, title: newTitle };
            }
            return page;
          }),
        }));
      } else {
        console.error("Failed to update page title:", response);
      }
    } catch (error) {
      console.error("Error during page title update:", error);
    }
  };

  const checkAuthentication = async () => {
    try {
      const isLoginPage = ["/login", "/signup"].includes(window.location.pathname);

      if (isLoginPage) {
        setUser(null);
        return;
      }

      const response = await fetch("/users", {
        method: "GET",
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuthentication();

    const handleLocationChange = () => {
      setLocation(window.location);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const handleLoginResponse = async (response) => {
    try {
      if (response.ok) {
        const user = await response.json();
        console.log("Login successful. User:", user); // Log the user object
        setUser(user);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const login = async (userData) => {
    try {
      console.log("Login initiated:", userData); // Log the userData object

      const response = await fetch("/users", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("Login response:", response); // Log the response object

      handleLoginResponse(response);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        response.json().then((data) => setUser(data));
      } else {
        console.error("Signup failed:", response);
      }
      return response;
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("/users", {
        method: "DELETE",
      });

      if (response.ok) {
        setUser(null);
      } else {
        console.error("Logout failed:", response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getBackgroundClass = () => {
    if (location) {
      const path = location.pathname;
      switch (path) {
        case "/landing":
          return "bg-red-500";
        case "/login":
          return "bg-blue-500";
        case "/signup":
          return "bg-yellow-500";
        default:
          return "bg-indigo-500";
      }
    }
    return "bg-white";
  };

  const backgroundClass = getBackgroundClass();

  useEffect(() => {
    console.log("User:", user); // Log the user state
    console.log("Location:", location); // Log the location state
  }, [user, location]);

  const handleAddPage = () => {
    if (user && user.pages) {
      const newPage = { title: "New Page" };
      addPage({ id: user.pages.length + 1, ...newPage }); // Wrap newPage object with { id: ..., ...newPage }
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        checkAuthentication,
        addPage,
        removePage,
        editPageTitle,
        handleAddPage,
      }}
    >
      <div className={`bg-indigo-500 ${backgroundClass}`}>{children}</div>
    </AppContext.Provider>
  );
};

// Custom hook to access the AppContext
export const useAppContext = () => useContext(AppContext);
