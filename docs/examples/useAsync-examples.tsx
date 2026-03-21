/**
 * useAsync Examples
 * Practical examples showing how to use useAsync with your services
 */

import { useAsync } from "@/hooks";
import { userService } from "@/services/user.service";
import { authService } from "@/services/auth.service";

// ============================================================================
// EXAMPLE 1: Fetch Data on Mount
// ============================================================================

export function UserProfileExample() {
  const { data: user, isLoading, error } = useAsync(
    userService.getById,
    {
      immediate: true,
      immediateParams: ["user-id-123"],
      toast: {
        enabled: true,
        errorMessage: "Failed to load user profile",
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
}

// ============================================================================
// EXAMPLE 2: Form Submission (POST)
// ============================================================================

export function CreateUserFormExample() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const { execute: createUser, isLoading } = useAsync(
    userService.create,
    {
      toast: {
        enabled: true,
        successMessage: "User created successfully!",
        errorMessage: "Failed to create user",
      },
      onSuccess: (newUser) => {
        console.log("Created user:", newUser);
        // Reset form
        setFormData({ name: "", email: "" });
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
    } catch (error) {
      console.error("Submission failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />
      <input
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}

// ============================================================================
// EXAMPLE 3: Update Data (PATCH)
// ============================================================================

export function UpdateUserExample({ userId, initialData }) {
  const [formData, setFormData] = useState(initialData);

  const { execute: updateUser, isLoading } = useAsync(
    userService.update,
    {
      toast: {
        enabled: true,
        successMessage: "Profile updated!",
      },
      onSuccess: (updatedUser) => {
        console.log("Updated:", updatedUser);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(userId, formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <button type="submit" disabled={isLoading}>
        Save Changes
      </button>
    </form>
  );
}

// ============================================================================
// EXAMPLE 4: Delete with Confirmation (DELETE)
// ============================================================================

export function DeleteUserButtonExample({ userId }) {
  const { execute: deleteUser, isLoading } = useAsync(
    userService.delete,
    {
      toast: {
        enabled: true,
        successMessage: "User deleted successfully",
        errorMessage: "Failed to delete user",
      },
      onSuccess: () => {
        // Redirect or refresh list
        router.push("/users");
      },
    }
  );

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
    }
  };

  return (
    <button onClick={handleDelete} disabled={isLoading}>
      {isLoading ? "Deleting..." : "Delete User"}
    </button>
  );
}

// ============================================================================
// EXAMPLE 5: Multiple Operations (CRUD)
// ============================================================================

export function UserManagementExample() {
  // FETCH - Load users
  const {
    data: users,
    isLoading,
    execute: refreshUsers,
  } = useAsync(userService.getAll, {
    immediate: true,
  });

  // CREATE - Add new user
  const { execute: createUser, isLoading: isCreating } = useAsync(
    userService.create,
    {
      toast: {
        enabled: true,
        successMessage: "User created!",
      },
      onSuccess: () => {
        refreshUsers(); // Reload list
      },
    }
  );

  // UPDATE - Edit user
  const { execute: updateUser } = useAsync(userService.update, {
    toast: {
      enabled: true,
      successMessage: "User updated!",
    },
    onSuccess: () => {
      refreshUsers(); // Reload list
    },
  });

  // DELETE - Remove user
  const { execute: deleteUser } = useAsync(userService.delete, {
    toast: {
      enabled: true,
      successMessage: "User deleted!",
    },
    onSuccess: () => {
      refreshUsers(); // Reload list
    },
  });

  return (
    <div>
      <button onClick={() => createUser({ name: "New User", email: "new@example.com" })}>
        Add User
      </button>

      {isLoading ? (
        <div>Loading users...</div>
      ) : (
        <ul>
          {users?.map((user) => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => updateUser(user.id, { name: "Updated" })}>
                Edit
              </button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ============================================================================
// EXAMPLE 6: Re-fetch on Dependency Change
// ============================================================================

export function UserSearchExample() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data: users, isLoading } = useAsync(
    userService.search,
    {
      immediate: true,
      immediateParams: [searchQuery, { page }],
      deps: [searchQuery, page], // Re-fetch when these change
    }
  );

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search users..."
      />

      {isLoading ? (
        <div>Searching...</div>
      ) : (
        <div>
          {users?.map((user) => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>
      )}

      <button onClick={() => setPage(page - 1)}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

// ============================================================================
// EXAMPLE 7: Password Reset Flow
// ============================================================================

export function PasswordResetExample() {
  const [email, setEmail] = useState("");

  const { execute: requestReset, isLoading, error } = useAsync(
    authService.requestPasswordReset,
    {
      toast: {
        enabled: true,
        successMessage: "Reset link sent! Check your email.",
        errorMessage: "Failed to send reset email",
      },
      onSuccess: () => {
        setEmail(""); // Clear form
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await requestReset({ email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Reset Link"}
      </button>
      {error && <div className="error">{error.message}</div>}
    </form>
  );
}

// ============================================================================
// EXAMPLE 8: File Upload
// ============================================================================

export function AvatarUploadExample() {
  const { execute: uploadAvatar, isLoading } = useAsync(
    userService.uploadAvatar,
    {
      toast: {
        enabled: true,
        successMessage: "Avatar uploaded successfully!",
        errorMessage: "Failed to upload avatar",
      },
      onSuccess: (updatedUser) => {
        console.log("New avatar URL:", updatedUser.avatar);
      },
    }
  );

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await uploadAvatar(file);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isLoading}
      />
      {isLoading && <div>Uploading...</div>}
    </div>
  );
}

// ============================================================================
// EXAMPLE 9: Optimistic Update
// ============================================================================

export function OptimisticUpdateExample({ userId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);

  const { execute: likeUser } = useAsync(userService.like, {
    onSuccess: (response) => {
      setLikes(response.likes); // Update with server response
    },
    onError: () => {
      setLikes(initialLikes); // Rollback on error
    },
  });

  const handleLike = async () => {
    // Optimistic update
    setLikes(likes + 1);

    try {
      await likeUser(userId);
    } catch (error) {
      // Rollback already handled by onError
    }
  };

  return (
    <button onClick={handleLike}>
      👍 {likes} Likes
    </button>
  );
}

// ============================================================================
// EXAMPLE 10: Reset State
// ============================================================================

export function ResetStateExample() {
  const { data, isLoading, error, execute, reset } = useAsync(
    userService.getAll
  );

  const handleRefresh = () => {
    reset(); // Clear all state
    execute(); // Fetch fresh data
  };

  const handleClear = () => {
    reset(); // Just clear everything
  };

  return (
    <div>
      {data && <div>Data: {JSON.stringify(data)}</div>}
      {error && <div>Error: {error.message}</div>}

      <button onClick={execute} disabled={isLoading}>
        Load Data
      </button>
      <button onClick={handleRefresh}>Refresh</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}
