"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiXMark, HiPhoto, HiPlus, HiTrash } from "react-icons/hi2";
import toast from "react-hot-toast";
import { addFacility, updateFacility } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const FACILITY_TYPES = ["Football", "Basketball", "Tennis", "Swimming", "Badminton", "Cricket", "Volleyball", "Table Tennis"];

const EMPTY_SLOT = { start_time: "", end_time: "" };

export default function AddFacilityModal({ isOpen, onClose, onSuccess, editData = null }) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [slots, setSlots] = useState(
    editData?.available_slots?.length
      ? editData.available_slots
      : [{ ...EMPTY_SLOT }]
  );
  const [imagePreview, setImagePreview] = useState(editData?.image || "");

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: editData || {},
  });

  useEffect(() => {
    if (editData) {
      Object.entries(editData).forEach(([k, v]) => setValue(k, v));
      setSlots(
        editData.available_slots?.length
          ? editData.available_slots
          : [{ ...EMPTY_SLOT }]
      );
      setImagePreview(editData.image || "");
    } else {
      reset();
      setSlots([{ ...EMPTY_SLOT }]); // Fix: was [""], must be array of slot objects
      setImagePreview("");
    }
  }, [editData, setValue, reset]);

  const uploadImage = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (!data.success) throw new Error("Upload failed");
      setImagePreview(data.data.url);
      setValue("image", data.data.url);
    } catch {
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const updateSlot = (index, field, value) => {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addSlot = () => setSlots((prev) => [...prev, { ...EMPTY_SLOT }]);

  const removeSlot = (index) =>
    setSlots((prev) => prev.filter((_, j) => j !== index));

  const onSubmit = async (data) => {
    if (!imagePreview) return toast.error("Please upload a facility image.");
    const cleanSlots = slots.filter((s) => s.start_time && s.end_time);
    if (!cleanSlots.length) return toast.error("Add at least one complete time slot.");
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        image: imagePreview,
        available_slots: cleanSlots,
        owner_email: user?.email,
      };
      if (editData?._id) {
        await updateFacility(editData._id, payload);
        toast.success("Facility updated successfully!");
      } else {
        await addFacility(payload);
        toast.success("Facility added successfully!");
      }
      onSuccess?.();
      onClose();
      reset();
      setSlots([{ ...EMPTY_SLOT }]);
      setImagePreview("");
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface dark:bg-slate-900 border border-outline-variant/40 dark:border-slate-700 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 dark:border-slate-700 bg-surface dark:bg-slate-900">
          <h2 className="font-display font-bold text-xl text-on-surface dark:text-slate-100">
            {editData ? "Update Facility" : "Add New Facility"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <HiXMark className="w-5 h-5 text-on-surface-variant" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface dark:text-slate-200">
              Facility Image *
            </label>
            <div className="relative flex items-center justify-center h-40 rounded-xl border-2 border-dashed border-outline-variant dark:border-slate-600 bg-surface-container/50 dark:bg-slate-800/50 overflow-hidden cursor-pointer hover:border-primary/60 transition-colors">
              {imagePreview ? (
                <Image fill src={imagePreview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-on-surface-variant dark:text-slate-400">
                  <HiPhoto className="w-10 h-10" />
                  <span className="text-sm">{uploading ? "Uploading…" : "Click to upload image"}</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
                disabled={uploading}
              />
            </div>
          </div>

          {/* Two-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-on-surface dark:text-slate-200">Facility Name *</label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="e.g. Dhaka Premier Turf"
                className="w-full px-3 py-2 rounded-xl border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.name && <p className="text-xs text-error">{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-on-surface dark:text-slate-200">Facility Type *</label>
              <select
                {...register("facility_type", { required: "Type is required" })}
                className="w-full px-3 py-2 rounded-xl border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select sport type</option>
                {FACILITY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.facility_type && <p className="text-xs text-error">{errors.facility_type.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-on-surface dark:text-slate-200">Location *</label>
              <input
                {...register("location", { required: "Location is required" })}
                placeholder="City, Country"
                className="w-full px-3 py-2 rounded-xl border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.location && <p className="text-xs text-error">{errors.location.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-on-surface dark:text-slate-200">Price Per Hour ($) *</label>
              <input
                type="number"
                min="0"
                step="0.01"
                {...register("price_per_hour", {
                  required: "Price is required",
                  min: { value: 0, message: "Must be positive" },
                })}
                placeholder="50"
                className="w-full px-3 py-2 rounded-xl border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.price_per_hour && <p className="text-xs text-error">{errors.price_per_hour.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-on-surface dark:text-slate-200">Capacity *</label>
              <input
                {...register("capacity", { required: "Capacity is required" })}
                placeholder="e.g. 22 players"
                className="w-full px-3 py-2 rounded-xl border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.capacity && <p className="text-xs text-error">{errors.capacity.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-on-surface dark:text-slate-200">Owner Email</label>
              <input
                value={user?.email || ""}
                readOnly
                className="w-full px-3 py-2 rounded-xl border border-outline-variant/50 dark:border-slate-700 bg-surface-container dark:bg-slate-700/50 text-on-surface-variant dark:text-slate-400 text-sm cursor-not-allowed"
              />
            </div>
          </div>

          {/* Time Slots */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface dark:text-slate-200">
              Available Time Slots *
            </label>
            <div className="space-y-2">
              {slots.map((slot, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="time"
                    value={slot.start_time || ""}
                    onChange={(e) => updateSlot(i, "start_time", e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <span className="text-sm font-bold text-on-surface-variant">to</span>
                  <input
                    type="time"
                    value={slot.end_time || ""}
                    onChange={(e) => updateSlot(i, "end_time", e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {slots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSlot(i)}
                      className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSlot}
                className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors cursor-pointer"
              >
                <HiPlus className="w-4 h-4" /> Add Slot
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-on-surface dark:text-slate-200">Description *</label>
            <textarea
              rows={3}
              {...register("description", { required: "Description is required" })}
              placeholder="Describe the facility, its features, and what makes it special…"
              className="w-full px-3 py-2 rounded-xl border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
            {errors.description && <p className="text-xs text-error">{errors.description.message}</p>}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-outline-variant dark:border-slate-600 text-on-surface-variant dark:text-slate-400 text-sm font-semibold hover:bg-surface-container dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || uploading}
              className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-60"
            >
              {submitting
                ? editData ? "Updating…" : "Adding…"
                : editData ? "Update Facility" : "Add Facility"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}