import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css'],
})
export class SingleBlogComponent implements OnInit {
  post: Post | null = null;
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');

    if (postId) {
      this.blogService.getPostById(postId).subscribe((data) => {
        if (data) {
          this.post = data;
        } else {
          console.error('Post not found');
          this.router.navigate(['/']); 
        }
      });
    } else {
      console.error('Invalid post ID');
      this.router.navigate(['/']);
    }
  }

  addComment(postId: string) {
    if (this.newComment) {
      const commentData = {
        text: this.newComment,
        createdAt: new Date(),
        displayName: 'Anonymous',
      };

      this.blogService
        .addComment(postId, commentData)
        .then(() => {
          this.newComment = '';
          console.log('Comment added');
        })
        .catch((err) => {
          console.error('Error adding comment', err);
        });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
