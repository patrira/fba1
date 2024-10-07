import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css'],
})
export class BlogFormComponent implements OnInit, OnChanges {
  @Input() post: any; 
  @Output() closeModal = new EventEmitter<void>(); 
  blogForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      imageUrl: [''],
      videoUrl: [''],
      createdAt: [new Date()],
      likes: [0],
    });
  }

  ngOnInit() {
    if (this.post) {
      this.blogForm.patchValue(this.post); 
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post'] && changes['post'].currentValue) {
      this.blogForm.patchValue(this.post); 
    }
  }

  get f() {
    return this.blogForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.blogForm.invalid) {
      return;
    }

    const postData = this.blogForm.value;

    if (postData.id) {
      // Update existing post
      this.blogService
        .updatePost(postData.id, postData)
        .then(() => {
          console.log('Post updated successfully');
          this.closeModal.emit(); // Emit close modal event
        })
        .catch((err) => {
          console.error('Error updating post', err);
        });
    } else {
      // Create new post
      this.blogService
        .createPost(postData)
        .then(() => {
          console.log('Post created successfully');
          this.router.navigate(['/']); // Navigate to home on success
        })
        .catch((err) => {
          console.error('Error creating post', err);
        });
    }
  }

  onCancel() {
    this.closeModal.emit(); // Emit close modal event when canceled
  }
}
