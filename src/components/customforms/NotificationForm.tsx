import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Button from "../ui/button/Button";
import MultiSelect from "../form/MultiSelect";
import TextArea from "../form/input/TextArea";

import { useNotification } from "../../hooks/useNotification";
import { useAuth } from "../../hooks/useAuth";
import { useRoles } from "../../hooks/useRoles";

export default function NotificationForm() {

  const { user } = useAuth();
  const { createNotification, loading } = useNotification(user?._id);
  const { roles, loading: rolesLoading } = useRoles();

  const [form, setForm] = useState({
    title: "",
    message: "",
    targetRoles: [] as string[]
  });

  const [errors, setErrors] = useState<any>({});
  const [successMsg, setSuccessMsg] = useState("");

  // 🧠 MAP ROLES → MULTISELECT OPTIONS
  const roleOptions =
    roles?.map((role: any) => ({
      value: role.name || role.code, // adjust depending on your backend
      text: role.name
    })) || [];

  // 🔍 VALIDATION
  const validate = () => {
    const newErrors: any = {};

    // if (!form.title.trim()) {
    //   newErrors.title = "Title is required";
    // }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    if (form.targetRoles.length === 0) {
      newErrors.targetRoles = "Select at least one role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🚀 SUBMIT
  const handleSubmit = async () => {
    setSuccessMsg("");

    if (!validate()) return;

    try {
      await createNotification({
        
        message: form.message,
        targetRoles: form.targetRoles
      });

      setSuccessMsg("Notification created successfully");

      setForm({
        title: "",
        message: "",
        targetRoles: []
      });

      setErrors({});

    } catch (err: any) {
      setErrors({ api: err.message || "Something went wrong" });
    }
  };

  return (
    <ComponentCard title="Create Notification">

      <div className="space-y-5">

        {/* TITLE
        <Input
          placeholder="Notification Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          error={!!errors.title}
          hint={errors.title}
        /> */}

        {/* MESSAGE */}
        <TextArea
          placeholder="Enter notification message..."
          value={form.message}
          onChange={(value) =>
            setForm({ ...form, message: value })
          }
          error={!!errors.message}
          hint={errors.message}
        />

        {/* ROLES */}
        <div>
          <MultiSelect
            label="Select Target Roles"
            options={roleOptions}
            value={form.targetRoles}
            onChange={(values) =>
              setForm({ ...form, targetRoles: values })
            }
            placeholder={
              rolesLoading ? "Loading roles..." : "Select roles"
            }
            disabled={rolesLoading}
          />

          {errors.targetRoles && (
            <p className="text-xs text-red-500 mt-1">
              {errors.targetRoles}
            </p>
          )}
        </div>

        {/* API ERROR */}
        {errors.api && (
          <div className="text-sm text-red-600">
            {errors.api}
          </div>
        )}

        {/* SUCCESS */}
        {successMsg && (
          <div className="text-sm text-green-600">
            {successMsg}
          </div>
        )}

      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-6 border-t mt-6">

        <Button
          onClick={handleSubmit}
          disabled={loading || rolesLoading}
        >
          {loading ? "Creating..." : "Create Notification"}
        </Button>

      </div>

    </ComponentCard>
  );
}