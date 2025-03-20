import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  loading: boolean;
}

const SubmitButton = ({ loading }: Props) => (
  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
    {loading ? "Saving..." : "Save Task"}
  </Button>
);

export default SubmitButton;
